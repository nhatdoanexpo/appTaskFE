import api from ".";


const classServices = {
    getClassbyMentor : async(mentorID) => {
        return new Promise((resolve,reject)=> {
            api.call().get(`/class/getclassmentor/${mentorID}`)
            .then(
                res => {
                    const {data} = res
                    resolve(data)
                }
            ).catch(
                err => reject(err)
            )
        })
    },
    getClassByStudent: async(studentID) => {
        return new Promise((resolve,reject) => {
            api.call().get(`class/getclass_student/${studentID}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    addClass: async(data)=>{
        return new Promise((resolve,reject)=>{
            api.call().post(`/class`,data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    }
}

export default classServices;
