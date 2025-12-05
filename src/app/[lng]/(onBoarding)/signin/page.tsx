import LoginForm from "@/onBoarding/components/SigninForm"

const SignInPage = async ({params}:{params:Promise<{lng:string}>}) => {
  const {lng}=await params
  return (
    <div>
      <LoginForm lng={lng} />
    </div>
  )
}

export default SignInPage