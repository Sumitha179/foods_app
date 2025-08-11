import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

// ✅ Appwrite Configuration
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: Platform.select({
    android: "com.panda.foodapp", // Must match your registered Android package name
    ios: "com.panda.foodapp.ios", // If you add iOS later
  }) as string,
  databaseId: "68789da70014bc52ff82",
  bucketId: "68643e170015edaa95d7",
  userCollectionId: "68789e9a000e0cdd9e46",
  categoriesCollectionId: "688b165d002d37fff054",
  menuCollectionId: "688b16e3000cb7ff7377",
  customizationsCollectionId: "688b18220030f4fc4135",
  menuCustomizationsCollectionId: "688b18f70000f476d6ca",
};

// ✅ Initialize Appwrite Client
export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// ✅ Ensure a session exists (anonymous or logged in)
export const ensureSession = async () => {
  try {
    const session = await account.getSession("current").catch(() => null);
    if (!session) {
      console.log("Creating anonymous session...");
      await account.createAnonymousSession();
    }
  } catch (e: any) {
    console.error("ensureSession Error:", e);
    throw new Error(e?.message || "Failed to ensure session");
  }
};

// ✅ Create User Account and Document
export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Account creation failed");

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        email,
        name,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      }
    );
  } catch (e: any) {
    console.error("CreateUser Error:", e);
    throw new Error(e?.message || "Failed to create user");
  }
};

// ✅ Sign In User
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const existingSession = await account.getSession("current").catch(() => null);
    if (!existingSession) {
      await account.createEmailPasswordSession(email, password);
    }
  } catch (e: any) {
    console.error("SignIn Error:", e);
    throw new Error(e?.message || "Failed to sign in");
  }
};

// ✅ Sign Out
export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (e: any) {
    console.error("SignOut Error:", e);
    throw new Error(e?.message || "Failed to sign out");
  }
};

// ✅ Get Current User
export const getCurrentUser = async () => {
  try {
    const session = await account.getSession("current").catch(() => null);
    if (!session) return null;

    const currentAccount = await account.get();
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) throw new Error("User doc not found");

    return currentUser.documents[0];
  } catch (e: any) {
    console.error("getCurrentUser Error:", e);
    throw new Error(e?.message || "Failed to get current user");
  }
};

// ✅ Get Menu Items
export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    await ensureSession();

    const queries = [];
    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menuItems = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );

    return menuItems.documents;
  } catch (e: any) {
    console.error("getMenu Error:", e);
    throw new Error(e?.message || "Failed to fetch menu");
  }
};

// ✅ Get Categories
export const getCategories = async () => {
  try {
    await ensureSession();
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );
    return categories.documents;
  } catch (e: any) {
    console.error("getCategories Error:", e);
    throw new Error(e?.message || "Failed to fetch categories");
  }
};
