"use client";

import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

function registerPage() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsloading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // collect data
    const formData = new FormData();
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!firstname || !lastname || !email || !password) {
      setError("please fill all the fields");
      return;
    }

    // validate
    setIsloading(true);
    setError("");

    // call the store
    const response = await createAccount(
      `${firstname}
             ${lastname}`,
      email.toString(),
      password.toString()
    );
    if (response.error) {
      setError(() => response.error!.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());
      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }
    setIsloading(false);
  };

  return (
    <div className="">
      {error && <p>{error}</p>}
      <div className="">
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
}

export default registerPage;
