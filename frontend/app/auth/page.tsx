"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider, githubProvider } from "../firebase";

const Auth: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
    setLoginData({ email: "", password: "" });
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = registerData;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        createdAt: new Date().toISOString(),
      });
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        router.push("/");
      } else {
        await setDoc(docRef, {
          uid,
          email: user.email,
          name: user.displayName || "No Name",
          createdAt: new Date().toISOString(),
          via: "login-auto-create",
        });
        router.push("/");
      }
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        alert("User not found. Please register first.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else {
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    try {
      const result = await signInWithPopup(auth, provider === "google" ? googleProvider : githubProvider);
      const user = result.user;
      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);
      if (!userSnap.exists()) {
        await setDoc(userDoc, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: new Date().toISOString(),
        });
      }
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={`truesight-auth-container${isRegister ? " right-panel-active" : ""}`}>
      <div className="background-bubbles">
        <div className="bubble bubble-purple" />
        <div className="bubble bubble-blue delay-1s" />
        <div className="bubble bubble-pink delay-2s" />
      </div>
      {/* REGISTER FORM */}
      <div className="font-semibold form-container sign-up-container font-poppins">
        <form onSubmit={handleRegister} autoComplete="off">
          <h2>Create Account</h2>
          <input type="text" name="name" placeholder="Name" autoComplete="off" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} required />
          <input type="email" name="email" placeholder="Email" autoComplete="off" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} required />
          <input type="password" name="password" placeholder="Password" autoComplete="new-password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" value={registerData.confirmPassword} onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} required />
          <button type="submit">Register</button>
          <div className="social-buttons">
            <button type="button" className="oauth-btn" onClick={() => handleOAuth("google")}>Register with Google</button>
            <button type="button" className="oauth-btn" onClick={() => handleOAuth("github")}>Register with GitHub</button>
          </div>
        </form>
      </div>
      {/* LOGIN FORM */}
      <div className="font-semibold form-container sign-in-container font-poppins">
        <form onSubmit={handleLogin} autoComplete="off">
          <h2>Sign In</h2>
          <input type="email" name="email" placeholder="Email" autoComplete="off" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
          <input type="password" name="password" placeholder="Password" autoComplete="new-password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
          <button type="submit">Login</button>
        </form>
      </div>
      {/* OVERLAY */}
      <div className="overlay-container font-poppins">
        <div className="overlay">
          <div className=" font-semibold overlay-panel overlay-left font-poppins">
            <h2>Welcome Back!</h2>
            <p>To keep connected, login with your personal info</p>
            <br></br>
            <button className="ghost" onClick={() => setIsRegister(false)}>Login</button>
          </div>
          <div className="font-semibold overlay-panel overlay-right font-poppins ">
            <h2>Hello, Friend!</h2>
            <p>Enter your details to start your journey with us</p>
            <br></br>
            <button className="ghost" onClick={() => setIsRegister(true)}>Register</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .truesight-auth-container {
          background: rgba(30, 31, 43, 0.95);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          box-shadow: 0 14px 28px rgba(138, 132, 255, 0.08), 0 10px 10px rgba(138, 132, 255, 0.06);
          position: relative;
          overflow: hidden;
          width: 768px;
          max-width: 100%;
          min-height: 480px;
          margin: 48px auto;
          transition: all 0.6s cubic-bezier(.68,-0.55,.27,1.55);
          display: flex;
          z-index: 1;
          animation: fadeInUp 1s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 50px;
          text-align: center;
          width: 50%;
          background: linear-gradient(135deg, #1E1F2B 0%, #2B2E4A 100%);
          box-shadow: 0 4px 24px rgba(138, 132, 255, 0.06);
          border-radius: 16px;
          animation: slideInLeft 1s cubic-bezier(.68,-0.55,.27,1.55);
          z-index: 2;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        input {
          padding: 12px;
          width: 100%;
          background: #1E1F2B;
          border: 1px solid #8A84FF;
          border-radius: 5px;
          outline: none;
          color: #FFFFFF;
        }
        input::placeholder {
          color: #ADB5BD;
        }
        button {
          padding: 12px;
          background-color: #8A84FF;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: fadeInUp 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        button:hover {
          background-color: #B57EDC;
          transform: scale(1.02);
        }
        button.ghost {
          background-color: transparent;
          border: 2px solid #FFFFFF;
        }
        .sign-in-container {
          left: 0;
          z-index: 2;
        }
        .sign-up-container {
          left: 0;
          opacity: 0;
          z-index: 1;
        }
        .truesight-auth-container.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }
        .truesight-auth-container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
        }
        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }
        .overlay {
          background: linear-gradient(to right, #8A84FF, #B57EDC);
          color: #fff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .truesight-auth-container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }
        .truesight-auth-container.right-panel-active .overlay {
          transform: translateX(50%);
        }
        .overlay-panel {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transition: all 0.6s ease-in-out;
        }
        .overlay-left {
          transform: translateX(-20%);
          left: 0;
        }
        .overlay-right {
          right: 0;
          transform: translateX(0);
        }
        .truesight-auth-container.right-panel-active .overlay-left {
          transform: translateX(0);
        }
        .truesight-auth-container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }
        .social-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .oauth-btn {
          padding: 10px;
          font-size: 0.9rem;
          background-color: #2B2E4A;
          color: #FFFFFF;
          border: 1px solid #8A84FF;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s ease;
          animation: fadeInUp 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .oauth-btn:hover {
          background-color: #8A84FF;
          transform: scale(1.02);
        }
        .background-bubbles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        .bubble {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.12;
          z-index: -1;
        }
        .bubble-purple {
          top: 25%;
          left: 25%;
          width: 120px;
          height: 120px;
          background: #8A84FF;
        }
        .bubble-blue {
          bottom: 25%;
          right: 25%;
          width: 100px;
          height: 100px;
          background: #B57EDC;
        }
        .bubble-pink {
          bottom: 20%;
          left: 35%;
          width: 110px;
          height: 110px;
          background: #B57EDC;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Auth; 