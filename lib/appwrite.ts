import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.panda.FoodApp",
  databaseId: "68789da70014bc52ff82",
  userCollectionId: "68789e9a000e0cdd9e46",
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

// ✅ Create User + Sign In + Create DB Entry
export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Failed to create user account");

    await signIn({ email, password }); // handles session cleanup

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
    throw new Error(e.message || "User creation failed");
  }
};

// ✅ Safe Sign In with session cleanup
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    // 🧹 Delete old session if it exists
    try {
      await account.deleteSession("current");
    } catch (err) {
      console.log("No session to delete:", err);
    }

    // 🔐 Create new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e: any) {
    throw new Error(e.message || "Sign-in failed");
  }
};

// ✅ Get Current User Info
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("User not found");

    const userDocs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!userDocs.documents.length) throw new Error("User document not found");

    return userDocs.documents[0];
  } catch (e: any) {
    console.log("getCurrentUser error:", e);
    throw new Error(e.message || "Failed to fetch current user");
  }
};


