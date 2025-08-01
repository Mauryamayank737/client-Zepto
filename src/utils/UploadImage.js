import axios from 'axios'
import SummaryApi from '../comman/SummaryApi'


const UploadImage =async(image) =>{
  try {
    const formData = new FormData()
    formData.append("image" , image)
    const resopnse =await axios[SummaryApi.uploadImage.method](SummaryApi.uploadImage.url ,formData , { withCredentials: true })

    // console.log(resopnse.data.imageUrl)

    return resopnse?.data?.imageUrl
    
  } catch (error) {
    return error
  }
}

export default UploadImage