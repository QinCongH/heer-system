//路径配置文件
const base = {
    host: 'http://localhost:8080/myApi', //基本地址
    commodityList: '/myApi/api/commodity', //商品 分页查询的列表
    coyAllList: '/myApi/api/commodityAll', //商品 查询全部
    updataImg: '/myApi/api/uploadImg', //图片上传
    coyAdd: '/myApi/api/commodityAdd', //商品增加
    coyDel: '/myApi/api/commodityDel', //商品删除
    coyOneList: '/myApi/api/commodityOne', //查询单个商品
    coyUpdata:'myApi/api/commodityUpdata',   //商品更新
    register:'myApi/api/register' ,  //注册接口
    registerTest:'myApi/api/rstquery' ,  //通过email查询接口
    loginTest:'myApi/api/loginquery',     //登录字段查询
}
export default base