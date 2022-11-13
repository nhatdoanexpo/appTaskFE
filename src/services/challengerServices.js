import api from '.';


const ChallengerServices = {
    getChallengerByClass : async (classID) => {
        return new Promise((resolve,reject) => {
            api.call().get(`/chl/challengerbyClass/${classID}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getAllTypeChallenger : async() => {
        return new Promise((resolve,reject) => {
            api.call().get(`/chl/type`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    addChallenger : (classID,typeID,name,note) => {
        return new Promise((resolve,reject) => {
            api.call().post(`/chl`,{
                classID : classID,
                type : typeID,
                name : name,
                note : note
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    deleteChallenger: (challengerID) => {
        return new Promise((resolve,reject)=> {
            api.call().delete(`/chl/${challengerID}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => reject(err))
        })
    }
}



export default ChallengerServices