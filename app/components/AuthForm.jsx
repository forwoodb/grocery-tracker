"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

const AuthForm = ({ mode }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <h2>Auth Form</h2>
      <form
        onSubmit={handleSubmit}
        className="
          mb-5 
          p-2.5 
          bg-gray-400"
      >
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="m-2 bg-white"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="m-2 bg-white"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="m-2 bg-white"
          />
        </div>
        <Button className="button" border>
          {mode}
        </Button>
      </form>
      <p>
        {mode === "login" ? "Don't" : "Already"} have an account?{" "}
        <Link href={mode === "login" ? "register" : "login"}>
          {mode === "login" ? "Register" : "Log In"}
        </Link>
      </p>
    </>
  );
};

export default AuthForm;
