"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQuery = void 0;
require("firebase/auth");
require("firebase/firestore");
const account_model_1 = require("../model/account.model");
const attendance_model_1 = require("../model/attendance.model");
const system_message_model_1 = require("../model/system_message.model");
const admin = require('firebase-admin');
const systemMessage = new system_message_model_1.SystemMessage();
const accounts = 'accounts';
const attendance = 'attendance';
class DatabaseQuery {
    static async commit(account) {
        try {
            var db = admin.firestore();
            await db
                .collection(accounts)
                .doc(account.id.toString())
                .set(account.toJson());
            console.log('not error');
            return systemMessage.success(account.toJson());
        }
        catch (error) {
            console.log(error);
            return systemMessage.error(error);
        }
    }
    static async getUser(id) {
        try {
            var db = admin.firestore();
            var userRef = await db.collection(accounts).doc(id).get();
            if (!userRef.exists) {
                throw systemMessage.error(506);
            }
            return systemMessage.success(userRef.data());
        }
        catch (error) {
            return error;
        }
    }
    static async hasID(id) {
        try {
            var db = admin.firestore();
            const userRef = db.collection(accounts).doc(id);
            var doc = await userRef.get();
            return !doc.exists;
        }
        catch (error) {
            throw systemMessage.error(error);
        }
    }
    static async deleteAccount(id) {
        try {
            var db = admin.firestore();
            await db.collection(accounts).doc(id).delete();
            return systemMessage.success(103);
        }
        catch (error) {
            console.log(error);
            return systemMessage.error(error);
        }
    }
    static async updateValues(id, account) {
        try {
            var db = admin.firestore();
            await db.collection(accounts).doc(id).update(account);
            var newUser = await db.collection(accounts).doc(id).get();
            return systemMessage.success(newUser.data());
        }
        catch (error) {
            console.log(error);
            throw systemMessage.error(error);
        }
    }
    static async setOnLeave(id, status) {
        try {
            var db = admin.firestore();
            var flag;
            if (status.toLowerCase() == 'true')
                flag = true;
            else if (status.toLowerCase() == 'false')
                flag = false;
            else
                throw systemMessage.error('invalid Boolean');
            await db.collection(accounts).doc(id).update({ onLeave: flag });
            return systemMessage.success(`${id} onLeave to ${flag}`);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    static async setOnResigned(id, status) {
        try {
            var db = admin.firestore();
            var flag;
            if (status.toLowerCase() == 'true')
                flag = true;
            else if (status.toLowerCase() == 'false')
                flag = false;
            else
                throw systemMessage.error('invalid Boolean');
            await db.collection(accounts).doc(id).update({ resigned: flag });
            return systemMessage.success(`${id} resigned to ${flag}`);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    static async getAllAccounts() {
        try {
            var db = admin.firestore();
            var userRef = await db.collection(accounts).get();
            var populatedData = [];
            userRef.forEach((doc) => {
                var data = doc.data();
                var user = new account_model_1.Account(data.name, data.id, data.department, data.collegeName, data.onLeave, data.resigned, data.password);
                populatedData.push(user.toJson());
            });
            return systemMessage.success(populatedData);
        }
        catch (error) {
            console.log(error);
            throw systemMessage.error(error);
        }
    }
    static async commitAttendance(attendances) {
        try {
            var db = admin.firestore();
            await db
                .collection(attendance)
                .doc(attendances.attendanceID.toString())
                .set(attendances.toJson());
            console.log('not error');
            return systemMessage.success(attendances.toJson());
        }
        catch (error) {
            console.log(error);
            return systemMessage.error(error);
        }
    }
    static async getAttendance(id) {
        try {
            var db = admin.firestore();
            var userRef = await db.collection(attendance).doc(id).get();
            if (!userRef.exists) {
                throw systemMessage.error(506);
            }
            return systemMessage.success(userRef.data());
        }
        catch (error) {
            return error;
        }
    }
    static async login(id, password) {
        try {
            var isValid = false;
            var db = admin.firestore();
            console.log(id);
            var userRef = await db
                .collection('accounts')
                .where('id', '==', parseInt(id))
                .where('password', '==', password);
            const querySnapshot = await userRef.get();
            await querySnapshot.forEach(function (doc) {
                isValid = true;
            });
            if (await isValid) {
                return await systemMessage.success('login success');
            }
            else {
                return await systemMessage.error('ID or password is incorrect');
            }
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    static async getAttendanceOfAccount(id) {
        try {
            console.log(id);
            var db = admin.firestore();
            var userRef = await db
                .collection(attendance)
                .where('employeeID', '==', parseInt(id));
            const querySnapshot = await userRef.get();
            const results = [];
            querySnapshot.forEach(function (doc) {
                results.push(doc.data());
            });
            return systemMessage.success(results);
        }
        catch (error) {
            console.log(error);
            throw systemMessage.error(error);
        }
    }
    static async hasID2(id) {
        try {
            var db = admin.firestore();
            const userRef = db.collection(attendance).doc(id);
            var doc = await userRef.get();
            return !doc.exists;
        }
        catch (error) {
            throw systemMessage.error(error);
        }
    }
    static async deleteAttendance(id) {
        try {
            var db = admin.firestore();
            await db.collection(attendance).doc(id).delete();
            return systemMessage.success(id + ' account deleted');
        }
        catch (error) {
            console.log(error);
            return systemMessage.error(error);
        }
    }
    static async updateAttendance(id, attendances) {
        try {
            var db = admin.firestore();
            await db.collection(attendance).doc(id).update(attendances);
            var newUser = await db.collection(attendance).doc(id).get();
            return systemMessage.success(newUser.data());
        }
        catch (error) {
            console.log(error);
            throw systemMessage.error(error);
        }
    }
    static async getAllAttendances() {
        try {
            var db = admin.firestore();
            var userRef = await db.collection(attendance).get();
            var populatedData = [];
            userRef.forEach((doc) => {
                var data = doc.data();
                var user = new attendance_model_1.Attendance(data.attendanceID, data.name, data.employeeID, data.date, data.time, data.classCode, data.department, data.remark);
                populatedData.push(user.toJson());
            });
            return systemMessage.success(populatedData);
        }
        catch (error) {
            console.log(error);
            throw systemMessage.error(error);
        }
    }
}
exports.DatabaseQuery = DatabaseQuery;
//# sourceMappingURL=firebase.database.js.map