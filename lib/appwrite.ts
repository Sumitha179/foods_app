import {Account,Client,Databases,ID,Query,
  Storage,
} from "react-native-appwrite";
import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";

// ✅ Config
export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "6878962c00106883d6d8",
  platform: "com.panda.FoodApp",
  databaseId: "68789da70014bc52ff82",
  bucketId: "688b1c250002411ddf63",
  userCollectionId: "68789e9a000e0cdd9e46",
  categoriesCollectionId: "688b165d002d37fff054",
  menuCollectionId: "688b16e3000cb7ff7377",
  customizationsCollectionId: "688b18220030f4fc4135",
  menuCustomizationsCollectionId: "688b18f70000f476d6ca",
};

// ✅ Initialize Appwrite Client
export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// ✅ Ensure session exists
export const ensureSession = async () => {
  try {
    const session = await account.getSession("current").catch(() => null);
    if (!session) {
      await account.createAnonymousSession();
    }
  } catch (error: any) {
    console.error("ensureSession Error:", error.message);
  }
};

// ✅ Create user and user document
export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Account creation failed");

    await signIn({ email, password });

    // ✅ SAFE fallback avatar (no Avatars API)
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

    const userDoc = await databases.createDocument(
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

    return userDoc;
  } catch (error: any) {
    console.error("createUser Error:", error.message);
    throw new Error(error.message);
  }
};

// ✅ Sign in user
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.getSession("current").catch(() => null);
    if (!session) {
      await account.createEmailPasswordSession(email, password);
    }
  } catch (error: any) {
    console.error("signIn Error:", error.message);
    throw new Error(error.message);
  }
};

// ✅ Sign out
export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    console.error("signOut Error:", error.message);
    throw new Error(error.message);
  }
};

// ✅ Get current user
export const getCurrentUser = async () => {
  try {
    const session = await account.getSession("current").catch(() => null);
    if (!session) return null;

    const currentAccount = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!user.documents.length) throw new Error("User document not found");
    return user.documents[0];
  } catch (error: any) {
    console.error("getCurrentUser Error:", error.message);
    throw new Error(error.message);
  }
};

// ✅ Get menu items
export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menuItems = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );

    return menuItems.documents;
  } catch (error: any) {
    console.error("getMenu Error:", error.message);
    throw new Error(error.message);
  }
};

// ✅ Get categories
export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );
    return categories.documents;
  } catch (error: any) {
    console.error("getCategories Error:", error.message);
    throw new Error(error.message);
  }
};
