import Image from "next/image";
import { closeIcon } from "@/assets";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { BoardContext, initialState } from "@/context/BoardGuruContext";

const LoginModule = ({ showLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoLog, setInfoLog] = useState("Welcome");
  const [logMessage, setLogMessage] = useState("Log out");
  const router = useRouter();

  const context = useContext(BoardContext);

  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    context.setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");

    const userStatus = res.data.user.identities;

    if (userStatus.length > 0) {
      context.submitBoardData(res.data.user.id);
      setInfoLog("Check your email ✉️");
      setLogMessage("Close");
      return;
    }
    setLogMessage("Close");
    setInfoLog("User all ready exist");
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.data.user === null) {
      alert("Wrong email or password");
      return;
    }

    context.setUser(res.data.user);
   
    showLogin(false);
    setInfoLog("Welcome");

    context.getUserData(res.data.user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    context.setUser(null);
    context.setState(initialState);
    showLogin(false);
  };

  if (context.loading)
    return (
      <section
        className="bg-gray-50  w-2/3 md:w-[400px] px-9 py-4 rounded-lg flex flex-col items-center gap-1 absolute top-10 left-0 right-0  mx-auto z-20 
  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] animated animatedFadeInUp fadeInUp  dark:dark:bg-[#383838] dark:text-white"
      >
        <p>Loading...</p>
      </section>
    );

  return (
    <>
      <section
        className="bg-gray-50  w-10/12 md:w-[400px] px-4 py-4 rounded-lg flex flex-col items-center gap-3 absolute top-10 left-0 right-0  mx-auto z-20 
        shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] animated animatedFadeInUp fadeInUp  dark:dark:bg-[#383838] dark:text-white"
      >
        <Image
          src={closeIcon}
          width={30}
          height={30}
          alt="close"
          className="self-end m-0 cursor-pointer"
          onClick={() => showLogin(false)}
        />
        {!context.user ? (
          <>
            <h3 className="font-bold text-2xl">Sign in to your account</h3>

            <input
              className=" border-2   p-2 rounded-md  dark:bg-black/40 dark:border-black  w-4/5"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className=" border-2  p-2 rounded-md mb-4  dark:bg-black/40 dark:border-black w-4/5"
              type="password"
              placeholder="Password"
              required
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignUp}
              className=" bg-green-500 py-2 px-4 rounded-lg active:bg-green-400 w-3/4 mb-2 text-white"
            >
              Sing up
            </button>
            <button
              onClick={handleSignIn}
              className=" bg-blue-500 py-2 px-4 rounded-lg active:bg-green-400 w-3/4 text-white"
            >
              Sing in
            </button>
          </>
        ) : (
          <>
            <p>{infoLog}</p>
            <button
              className=" bg-blue-500 py-2 px-4 rounded-lg active:bg-green-400 w-3/4"
              onClick={handleLogout}
            >
              {logMessage}
            </button>
          </>
        )}
      </section>
    </>
  );
};

export default LoginModule;
