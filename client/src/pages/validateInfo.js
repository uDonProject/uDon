export default function validateInfo(values){

    let errors = {}

    if(!values.nickname.trim()){
        errors.nickname = "닉네임 입력해주세요~!"
    }

    if(!values.name.trim()){
        errors.name = "이름을 입력해주세요~!"
    }

    if(!values.email){
        errors.email = "이메일을 입력해주세요~!"

    }else if( !/^[A-Z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/i.test(values.email)   ){

        errors.email = "이메일 주소 틀렸습니다."

    }

    if(!values.passwd) {

        errors.passwd = "패스워드 입력해주세요"

    }else if(values.passwd.length < 3) {
        errors.passwd = "패스워드 3자리 이상 해주세요"

    }

    return errors;

}