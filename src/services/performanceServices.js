import api from '.';

const PerformanceServices = {
    addPerformancesByChallenger : async (mentorID,classID,challengerID) => {
        return new Promise((resolve,reject) => {
            api.call().post(`/performance`,{
                mentorID : mentorID,
                classID : classID,
                challengerID : challengerID
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getPerformanceByStudentID : async (studentID) => {
        return new Promise((resolve,reject)=> {
            api.call().get(`/performance/getby_student/${studentID}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })  
    },
    updateStatus : async (performaceID) => {
        return new Promise((resolve,reject)=> {
            api.call().put(`/performance/updateStatus/${performaceID}`, {
                status : 'Hoàn tất'
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    }
}

export default  PerformanceServices;