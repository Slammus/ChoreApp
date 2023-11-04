const AUTH_HEADERS = {
    'Authorization': 'Basic ' + btoa("admin:admin"),
    'Content-Type': 'application/json',
};

const dbAddress = "http://localhost:5984";
const dbNameChores = "chores";
const dbNameUsers = "users";
const dbNameCompletedChores = "completed_chores";
const dbNameRewards = "rewards";
const dbNameClaimedRewards = "claimed_rewards";
const dbNameChoreGroups = "chore_groups"

export default class CouchFunctions {
    static async GetAll(db) {
        const allDocsResponse = await fetch(dbAddress + "/" + db + "/_all_docs?include_docs=true", {headers:AUTH_HEADERS});
        const allDocsJSON = await allDocsResponse.json();
        return allDocsJSON.rows;
    }

    static async GetAllChores() {
        return this.GetAll(dbNameChores);
    }

    static async GetAllUsers() {
        return this.GetAll(dbNameUsers);
    }

    static async GetAllCompletedChores() {
        return this.GetAll(dbNameCompletedChores);
    }

    static async GetAllRewards() {
        return this.GetAll(dbNameRewards);
    }

    static async GetAllClaimedRewards() {
        return this.GetAll(dbNameClaimedRewards);
    }

    static async GetAllChoreGroups() {
        return this.GetAll(dbNameChoreGroups);
    }

    static async AddChore(choreName, chorePoints) {
        if(!choreName || typeof choreName != "string" || !chorePoints || typeof chorePoints != "number") {
            console.error("AddChore params invalid -> choreName = " + choreName + ", chorePoints = " + chorePoints);
            return;
        }

        const newDoc = {
            choreName: choreName,
            chorePoints: chorePoints
        }

        const addChoreResponse = await fetch(dbAddress + "/" + dbNameChores, {headers:AUTH_HEADERS, method:"POST", body:JSON.stringify(newDoc)});
        const addChoreJSON = await addChoreResponse.json();

        return addChoreJSON;
    }

    static async AddUser(userName) {
        if(!userName || typeof userName != "string") {
            console.error("AddUser params invalid -> userName = " + userName);
            return;
        }

        const newUser = {
            userName: userName,
            currentPoints: 0
        }

        const addUserResponse = await fetch(dbAddress + "/" + dbNameUsers, {headers:AUTH_HEADERS, method:"POST", body:JSON.stringify(newUser)});
        const addUserJSON = await addUserResponse.json();

        return addUserJSON;
    }

    static async AddCompletedChore(choreName, userName, timeCompleted) {
        if(!choreName || typeof choreName != "string" || !userName || typeof userName != "string" || !timeCompleted || typeof timeCompleted != "number") {
            console.error("AddUser params invalid -> choreName = " + choreName + ", userName = " + userName + ", timeCompleted = " + timeCompleted);
            return;
        }

        const completedChore = {
            userName: userName,
            choreName: choreName,
            timeCompleted: timeCompleted
        }

        const addCompletedChoreResponse = await fetch(dbAddress + "/" + dbNameCompletedChores, {headers:AUTH_HEADERS, method:"POST", body:JSON.stringify(completedChore)});
        const addCompletedChoreJSON = await addCompletedChoreResponse.json();

        return addCompletedChoreJSON;
    }
}
