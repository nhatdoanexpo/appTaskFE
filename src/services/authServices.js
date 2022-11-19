import api from ".";


const authServices = {
    authLogin : async(email,password) => {
        return new Promise((resolve,reject)=> {
            api.call().post('/auth/login',{
                email : email,
                password : password
            }).then(
                res => {
                    const {data} = res
                    resolve(data)
                }
            ).catch(
                err => reject(err)
            )
        })
    },
    authRegister : async(name,email,password) => {
        return new Promise((resolve,reject)=> {
            api.call().post('/auth/register',{
                name : name,
                email : email,
                password : password
            }).then(
                res => {
                    const {data} = res
                    resolve(data)
                }
            ).catch(
                err => {
                    reject(err.response.data)
                }
            )
        })
    },
    getUserInfo : async(id) => {
        return new Promise((resolve,reject)=> {
            api.call().get(`/auth/userById/${id}`)
                .then(
                    res => {
                        const {data} = res
                        resolve(data)
                    }
                ).catch(
                err => reject(err)
            )
        })
    }
}

export default authServices;
