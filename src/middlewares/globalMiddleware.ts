import axios from "axios";


export const onBoardingMiddleware = async(clerkId: string,name: string,email: string,password?: string) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8787/user/onboard?clerkId=${clerkId}`, 
            {
                name,
                email,
                password
            }
        )
    
        if(response.status ===200 || response.status === 201){
            return response.data
        }
    
        return null
    } catch (error) {
        console.log("Error in onboarding middleware",error)
        return null
    }
    
}