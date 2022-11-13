import api from '.';

const MissionServices = {
    getMissionByChallengerID : async(challengerID) => {
        return new Promise((resolve,reject)=> {
            api.call().get(`/mission/getmissionbychallenger/${challengerID}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    addMission: async(challengerID,des,note)=>{
        return new Promise((resolve,reject)=>{
            api.call().post(`/mission`,{
                challengerID : challengerID,
                des : des,
                note : note
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    }
}

export default MissionServices;