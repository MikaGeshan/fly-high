import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaHotel, FaImage } from "react-icons/fa";
import Swal from "sweetalert2";

export default function UpdateRoom({ room }) {
    const [imagePreview, setImagePreview] = useState(
        room.gambar_kamar
            ? `${window.location.origin}/storage/${room.gambar_kamar}`
            : null
    );

    const { data, setData, put, errors } = useForm({
        nama_kamar: room.nama_kamar || "",
        jenis_kamar: room.jenis_kamar || "",
        harga: room.harga || "",
        fasilitas: room.fasilitas || "",
        status: room.status || "Available",
        gambar_kamar: null,
    });

    useEffect(() => {
        setData({
            nama_kamar: room.nama_kamar || "",
            jenis_kamar: room.jenis_kamar || "",
            harga: room.harga || "",
            fasilitas: room.fasilitas || "",
            status: room.status || "Available",
            gambar_kamar: null,
        });
        setImagePreview(
            room.gambar_kamar
                ? `${window.location.origin}/storage/${room.gambar_kamar}`
                : null
        );
    }, [room]);

    const handleChange = (e) => {
        const { id, value, files } = e.target;

        if (id === "gambar_kamar") {
            const file = files[0];
            setData("gambar_kamar", file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setData(id, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/rooms/${room.id}`, {
            onSuccess: () => {
                Swal.fire(
                    "Success!",
                    "Room data has been updated successfully.",
                    "success"
                ).then(() => {
                    window.location.href = "/admin/rooms/list";
                });
            },
            onError: () => {
                Swal.fire(
                    "Error!",
                    "An error occurred while updating the room data.",
                    "error"
                );
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8 ml-50">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                <FaHotel className="mr-3" /> Update Room
                            </h1>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit}>
                                {errors.jenis_kamar && (
                                    <div className="text-red-500 mb-2">
                                        {errors.jenis_kamar}
                                    </div>
                                )}
                                {errors.harga && (
                                    <div className="text-red-500 mb-2">
                                        {errors.harga}
                                    </div>
                                )}
                                {errors.gambar_kamar && (
                                    <div className="text-red-500 mb-2">
                                        {errors.gambar_kamar}
                                    </div>
                                )}

                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="nama_kamar"
                                        >
                                            Room Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="nama_kamar"
                                            type="text"
                                            placeholder="Enter room name"
                                            value={data.nama_kamar}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="fasilitas"
                                        >
                                            Facilities
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="fasilitas"
                                            type="text"
                                            placeholder="Enter room facilities"
                                            value={data.fasilitas}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="jenis_kamar"
                                        >
                                            Room Type
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="jenis_kamar"
                                            value={data.jenis_kamar}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Room Type
                                            </option>
                                            <option value="Standard Room">
                                                Standard Room
                                            </option>
                                            <option value="Deluxe Room">
                                                Deluxe Room
                                            </option>
                                            <option value="Suite Room">
                                                Suite Room
                                            </option>
                                        </select>
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="harga"
                                        >
                                            Price
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="harga"
                                            type="number"
                                            placeholder="Enter room price"
                                            value={data.harga}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="gambar_kamar"
                                        >
                                            Room Image
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="gambar_kamar"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleChange}
                                            />
                                            <FaImage className="ml-2 text-gray-500" />
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img
                                                    src={imagePreview}
                                                    alt="Room Preview"
                                                    className="w-32 h-32 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="status"
                                        >
                                            Status
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="status"
                                            value={data.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Available">
                                                Available
                                            </option>
                                            <option value="Booked">
                                                Booked
                                            </option>
                                            <option value="Not Available">
                                                Not Available
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Update Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
