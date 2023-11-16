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

    static async GetByID(db, id) {
        const docsResponse = await fetch(dbAddress + "/" + db + "/" + id, {headers:AUTH_HEADERS});
        const docsJSON = await docsResponse.json();
        return docsJSON;
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

    static async GetUserByID(id) {
        return this.GetByID(dbNameUsers, id);
    }

    static async GetChoreByID(id) {
        return this.GetByID(dbNameChores, id);
    }

    static async GetCompletedChoreByID(id) {
        return this.GetByID(dbNameCompletedChores, id);
    }

    static async GetRewardByID(id) {
        return this.GetByID(dbNameRewards, id);
    }

    static async GetClaimedRewardByID(id) {
        return this.GetByID(dbNameClaimedRewards, id);
    }

    static async AddChore(choreName, chorePoints, chorePointsPerMinute, choreAssigneeID, choreInstructions) {
        if(!choreName || typeof choreName != "string" 
        || !chorePoints || typeof chorePoints != "number"
        || typeof chorePointsPerMinute != "boolean"
        || typeof choreAssigneeID != "string") {
            console.error("AddChore params invalid -> choreName = " + choreName + ", chorePoints = " + chorePoints + ", chorePointsPerMinute = " + chorePointsPerMinute + ", choreAssigneeID = " + choreAssigneeID + ", choreInstructions = " + choreInstructions);
            return;
        }

        const newDoc = {
            choreName: choreName,
            chorePoints: chorePoints,
            chorePointsPerMinute: chorePointsPerMinute,
            choreAssigneeID: choreAssigneeID,
            choreInstructions: choreInstructions
        }

        const addChoreResponse = await fetch(dbAddress + "/" + dbNameChores, {headers:AUTH_HEADERS, method:"POST", body:JSON.stringify(newDoc)});
        const addChoreJSON = await addChoreResponse.json();

        return addChoreJSON;
    }

    static async EditChore(id, choreName, chorePoints, chorePointsPerMinute, choreAssigneeID, choreInstructions) {
        if(!choreName || typeof choreName != "string" 
        || !chorePoints || typeof chorePoints != "number"
        || typeof chorePointsPerMinute != "boolean"
        || typeof choreAssigneeID != "string") {
            console.error("EditChore params invalid -> choreName = " + choreName + ", chorePoints = " + chorePoints + ", chorePointsPerMinute = " + chorePointsPerMinute + ", choreAssigneeID = " + choreAssigneeID + ", choreInstructions = " + choreInstructions);
            return;
        }

        const chore = await this.GetChoreByID(id);

        chore.choreName = choreName;
        chore.chorePoints = chorePoints;
        chore.chorePointsPerMinute = chorePointsPerMinute;
        chore.choreAssigneeID = choreAssigneeID;
        chore.choreInstructions = choreInstructions;

        const editChoreResponse = await fetch(dbAddress + "/" + dbNameChores + "/" + id, {headers:AUTH_HEADERS, method:"PUT", body:JSON.stringify(chore)});
        const editChoreJSON = await editChoreResponse.json();

        return editChoreJSON;
    }

    static async RemoveChore(id) {
        const chore = await this.GetChoreByID(id);

        const removeChoreResponse = await fetch(dbAddress + "/" + dbNameChores + "/" + id + "?rev=" + chore._rev, {headers:AUTH_HEADERS, method:"DELETE"});
        const removeChoreJSON = await removeChoreResponse.json();

        return removeChoreJSON;
    }

    static async AddReward(rewardName, requiredPoints) {
        if(!rewardName || typeof rewardName != "string" 
        || !requiredPoints || typeof requiredPoints != "number") {
            console.error("AddReward params invalid -> rewardName = " + rewardName + ", requiredPoints = " + requiredPoints);
            return;
        }

        const newDoc = {
            rewardName: rewardName,
            rewardRequiredPoints: requiredPoints,
        }

        const addRewardResponse = await fetch(dbAddress + "/" + dbNameRewards, {headers:AUTH_HEADERS, method:"POST", body:JSON.stringify(newDoc)});
        const addRewardJSON = await addRewardResponse.json();

        return addRewardJSON;
    }

    static async EditReward(id, rewardName, requiredPoints) {
        if(!rewardName || typeof rewardName != "string" 
        || !requiredPoints || typeof requiredPoints != "number") {
            console.error("EditReward params invalid -> rewardName = " + rewardName + ", requiredPoints = " + requiredPoints);
            return;
        }

        const reward = await this.GetRewardByID(id);

        reward.rewardName = rewardName;
        reward.rewardRequiredPoints = requiredPoints;

        const editRewardResponse = await fetch(dbAddress + "/" + dbNameRewards + "/" + id, {headers:AUTH_HEADERS, method:"PUT", body:JSON.stringify(reward)});
        const editRewardJSON = await editRewardResponse.json();

        return editRewardJSON;
    }

    static async RemoveReward(id) {
        const reward = await this.GetRewardByID(id);

        const removeRewardResponse = await fetch(dbAddress + "/" + dbNameRewards + "/" + id + "?rev=" + reward._rev, {headers:AUTH_HEADERS, method:"DELETE"});
        const removeRewardJSON = await removeRewardResponse.json();

        return removeRewardJSON;
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

    static async EditUser(id, userName) {
        if(!userName || typeof userName != "string") {
            console.error("EditUser params invalid -> userName = " + userName);
            return;
        }

        const user = await this.GetUserByID(id);

        user.userName = userName;

        const editUserResponse = await fetch(dbAddress + "/" + dbNameUsers + "/" + id, {headers:AUTH_HEADERS, method:"PUT", body:JSON.stringify(user)});
        const editUserJSON = await editUserResponse.json();

        return editUserJSON;
    }

    static async RemoveUser(id) {
        const user = await this.GetUserByID(id);

        const removeUserResponse = await fetch(dbAddress + "/" + dbNameUsers + "/" + id + "?rev=" + user._rev, {headers:AUTH_HEADERS, method:"DELETE"});
        const removeUserJSON = await removeUserResponse.json();

        return removeUserJSON;
    }

    static async AddCompletedChore(choreID, userID, timeCompleted, minutesTaken, notes) {
        if(!choreID || typeof choreID != "string" || !userID || typeof userID != "string" || !timeCompleted || typeof timeCompleted != "object") {
            console.error("AddCompletedChore params invalid -> choreID = " + choreID + ", userID = " + userID + ", timeCompleted = " + timeCompleted + ", minutesTaken = " + minutesTaken + ", notes = " + notes);
            return;
        }

        const completedChore = {
            userID: userID,
            choreID: choreID,
            timeCompleted: timeCompleted,
            minutesTaken: minutesTaken,
            notes: notes
        }

        const addCompletedChoreResponse = await fetch(dbAddress + "/" + dbNameCompletedChores, {headers:AUTH_HEADERS, method:"POST", body:JSON.stringify(completedChore)});
        const addCompletedChoreJSON = await addCompletedChoreResponse.json();

        return addCompletedChoreJSON;
    }

    static async EditCompletedChore(id, choreID, userID, timeCompleted, minutesTaken, notes) {
        if(!choreID || typeof choreID != "string" || !userID || typeof userID != "string" || !timeCompleted || typeof timeCompleted != "object") {
            console.error("EditCompletedChore params invalid -> choreID = " + choreID + ", userID = " + userID + ", timeCompleted = " + timeCompleted + ", minutesTaken = " + minutesTaken + ", notes = " + notes);
            return;
        }

        const completedChore = await this.GetCompletedChoreByID(id);

        completedChore.userID = userID;
        completedChore.choreID = choreID;
        completedChore.timeCompleted = timeCompleted;
        completedChore.minutesTaken = minutesTaken;
        completedChore.notes = notes;

        const editCompletedChoreResponse = await fetch(dbAddress + "/" + dbNameCompletedChores + "/" + id, {headers:AUTH_HEADERS, method:"PUT", body:JSON.stringify(completedChore)});
        const editCompletedChoreJSON = await editCompletedChoreResponse.json();

        return editCompletedChoreJSON;
    }

    static async RemoveCompletedChore(id) {
        const completedChore = await this.GetCompletedChoreByID(id);

        const removeCompletedChoreResponse = await fetch(dbAddress + "/" + dbNameCompletedChores + "/" + id + "?rev=" + completedChore._rev, {headers:AUTH_HEADERS, method:"DELETE"});
        const removeCompletedChoreJSON = await removeCompletedChoreResponse.json();

        return removeCompletedChoreJSON;
    }

    static async AddClaimedReward(rewardID, userID, timeCompleted) {
        if(!rewardID || typeof rewardID != "string" || !userID || typeof userID != "string" || !timeCompleted || typeof timeCompleted != "object") {
            console.error("AddClaimedReward params invalid -> rewardID = " + rewardID + ", userID = " + userID + ", timeCompleted = " + timeCompleted);
            return;
        }

        const claimedReward = {
            rewardID: rewardID,
            userID: userID,
            timeCompleted: timeCompleted
        }

        const addClaimedRewardResponse = await fetch(dbAddress + "/" + dbNameClaimedRewards, {headers:AUTH_HEADERS, method:"POST", body:JSON.stringify(claimedReward)});
        const addClaimedRewardJSON = await addClaimedRewardResponse.json();

        return addClaimedRewardJSON;
    }

    static async EditClaimedReward(id, rewardID, userID, timeCompleted) {
        if(!rewardID || typeof rewardID != "string" || !userID || typeof userID != "string" || !timeCompleted || typeof timeCompleted != "object") {
            console.error("EditClaimedReward params invalid -> rewardID = " + rewardID + ", userID = " + userID + ", timeCompleted = " + timeCompleted);
            return;
        }

        const claimedReward = await this.GetClaimedRewardByID(id);

        claimedReward.userID = userID;
        claimedReward.rewardID = rewardID;
        claimedReward.timeCompleted = timeCompleted;

        const editClaimedRewardResponse = await fetch(dbAddress + "/" + dbNameClaimedRewards + "/" + id, {headers:AUTH_HEADERS, method:"PUT", body:JSON.stringify(claimedReward)});
        const editClaimedRewardJSON = await editClaimedRewardResponse.json();

        return editClaimedRewardJSON;
    }

    static async RemoveClaimedReward(id) {
        const claimedReward = await this.GetClaimedRewardByID(id);

        const removeClaimedRewardResponse = await fetch(dbAddress + "/" + dbNameClaimedRewards + "/" + id + "?rev=" + claimedReward._rev, {headers:AUTH_HEADERS, method:"DELETE"});
        const removeClaimedRewardJSON = await removeClaimedRewardResponse.json();

        return removeClaimedRewardJSON;
    }
}
