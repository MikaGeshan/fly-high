import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { FiEye, FiEyeOff, FiSend } from "react-icons/fi";

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [agreed, setAgreed] = useState(false);
    const [agreementError, setAgreementError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) {
            setAgreementError("You need to agree to the terms and conditions");
            return;
        }
        post("/register");
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-white flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                    <FiSend className="mb-2 text-3xl" />
                    <h1 className="text-4xl font-bold text-blue-800 mb-2">
                        Fly High
                    </h1>
                    <p className="text-gray-600">
                        Wujudkan Perjalanan dengan Caramu Sendiri
                    </p>
                </div>
            </div>
            <div className="w-1/2 bg-blue-800 flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-lg w-96">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            Register to FlyHigh
                        </h2>
                        <p className="text-md mb-3 text-gray-600">
                            Already have an account?
                            <Link
                                href="/login"
                                className="text-gray-400 hover:underline"
                            >
                                Sign in now!
                            </Link>
                        </p>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-1 p-1 text-sm block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                required
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="mt-1 p-1 text-sm block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                required
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="mt-1 p-1 text-sm block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 p-1 text-sm block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {showConfirmPassword ? (
                                        <FiEye />
                                    ) : (
                                        <FiEyeOff />
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <span className="text-red-500 text-sm">
                                    {errors.password_confirmation}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="checkbox"
                                id="agreement"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mr-2"
                            />
                            <label
                                htmlFor="agreement"
                                className="text-sm font-medium text-gray-700"
                            >
                                I agree to the terms and conditions
                            </label>
                            {agreementError && (
                                <span className="text-red-500 text-sm">
                                    {agreementError}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={processing}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
