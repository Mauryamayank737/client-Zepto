
export const baseUrl = "http://localhost:3000";

const SummaryApi = {
  register: {
    url: `${baseUrl}/api/user/register`,
    method: "post",
  },
  login: {
    url: `${baseUrl}/api/user/login`,
    method: "post",
  },
  UserDetails: {
    url: `${baseUrl}/api/user/user_detail`,
    method: "get",
  },
  logout: {
    url: `${baseUrl}/api/user/logout`,
    method: "get",
  },
  otpsend: {
    url: `${baseUrl}/api/user/otpsend`,
    method: "post",
  },
  verification: {
    url: `${baseUrl}/api/user/verification`,
    method: "post",
  },
  resetPassword: {
    url: `${baseUrl}/api/user/forgetpassword`,
    method: "post",
  },
  uploadAvatar: {
    url: `${baseUrl}/api/user/uploadAvatar`,
    method: "post",
  },
  updateUserDetail: {
    url: `${baseUrl}/api/user/updateDetails`,
    method: "put",
  },
  AllCategory: {
    url: `${baseUrl}/api/category/allcategory`,
    method: "get",
  },
  addCategory: {
    url: `${baseUrl}/api/category/addCategory`,
    method: "post",
  },
  updateCategory: {
    url: `${baseUrl}/api/category/updateCategory`,
    method: "put",
  },
  deleteCategory: {
    url: `${baseUrl}/api/category/deleteCategory`,
    method: "post",
  },
  uploadImage: {
    url: `${baseUrl}/api/file/upload`,
    method: "post",
  },

  addsubcategory: {
    url: `${baseUrl}/api/subcategory/post`,
    method: "post",
  },
  Allsubcategory: {
    url: `${baseUrl}/api/subcategory/get`,
    method: "get",
  },
  updateSubCategory: {
    url: `${baseUrl}/api/subcategory/update`,
    method: "put",
  },
  deleteSubCategory: {
    url: `${baseUrl}/api/subcategory/delete`,
    method: "post",
  },
  addProduct:{
    url: `${baseUrl}/api/product/create`,
    method: "post",
  },
  // AllProduct:{
  //   url: `${baseUrl}/api/product/get`,
  //   method: "get",
  // },
  DeleteProduct :{
     url: `${baseUrl}/api/product/delete`,
    method: "post",
  },
  UpdateProduct :{
     url: `${baseUrl}/api/product/update`,
    method: "post",
  },
  SearchProduct :{
     url: `${baseUrl}/api/product/filtter`,
    method: "post",
  },
  view :{
     url: `${baseUrl}/api/product/view`,
    method: "get",
  },
  list :{
     url: `${baseUrl}/api/product/list`,
    method: "post",
  },
  getProductByCategory :{
     url: `${baseUrl}/api/product/productBycategory`,
    method: "post",
  },
  getSubcategoryByCategory :{
    url :`${baseUrl}/api/subcategory/subCategoryByCategory`,
    method: "post",
  },
  getProductBySubcategory :{
     url: `${baseUrl}/api/product/productBySubcategory`,
    method: "post",
  },
};

export default SummaryApi;
