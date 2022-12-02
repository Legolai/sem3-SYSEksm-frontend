import {Link, Route, useNavigate} from "react-router-dom";


const SignUp = () => {
    return (
    <div className={'flex flex-col items-center gap-10 justify-center h-full'}>
            <div className="bg-white flex flex-col items-center gap-10 justify-center p-16 rounded-lg shadow-lg">
                <Link to={'/signup/scout'}
                      className={'transition-all text-white bg-green-400 m-0 px-8 py-4 text-xl rounded-lg hover:scale-105 hover:shadow-lg active:scale-95'}>
                    Sign up as a FoocleScout
                </Link>

                <Link to={"/signup/business"}
                      className={'transition-all text-white bg-blue-400 m-0 px-8 py-4 text-xl rounded-lg hover:scale-105 hover:shadow-lg active:scale-95'}>
                    Sign up as a FoogleBusiness
                </Link>
            </div>
    </div>
    )

}

export default SignUp;
