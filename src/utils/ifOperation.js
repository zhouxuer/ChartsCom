import store from '../store'
export function ifOperation(value) {

    let isExist = false;
    // 从浏览器缓存中获取权限数组（该数组在登入成功后拉取用户的权限信息时保存在浏览器的缓存中）
    // store.getters
    const buttonpermsStr = store.getters.permissions;
    if (buttonpermsStr === undefined || buttonpermsStr == null) {
        return false;
    }
    // console.log(buttonpermsStr)
    if (buttonpermsStr.indexOf(value) >= 0 || buttonpermsStr[0] === '*:*:*') {
        // 若在按钮中定义的权限字段能在后端返回的权限数组中能找到，则该按钮可显示
        isExist = true;
    }
    return isExist;
}