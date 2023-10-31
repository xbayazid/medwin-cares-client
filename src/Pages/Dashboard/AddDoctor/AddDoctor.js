import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const {data: specialties, isLoading} = useQuery({
        querykey: ['specialty'],
        queryFn: async () =>{
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })
    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData =>{
            if(imgData.success){
                console.log(imgData.data.url);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }

                fetch('http://localhost:5000/doctors',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    toast.success(`${data.name} is added successfully`);
                    navigate('/dashboard/managedoctors');
                })
            }
        })
    }
    if(isLoading){
        return <Loading/>
    }
    return (
        <div>
            <h1 className="text-3xl">Add a new doctor</h1>
            <div className='w-96 p-7'>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full-max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register("name", { required: "Name is required" })} type="text" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", { required: "Email Address is required" })} type="text" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Specialty</span></label>
                        <select {...register("specialty", { required: "Specialty is required" })} className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Pick a specialty</option>
                            {
                                specialties.map(specialty =><option 
                                    key={specialty._id}
                                    value={specialty.name}
                                >{specialty.name}</option>)
                            }
                            
                        </select>
                    </div>
                    <div className="form-control w-full-max-w-xs">
                        <label className="label"><span className="label-text">Photo</span></label>
                        <input {...register("image", { required: "Photo is required" })} type="file" className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full my-3' value="Add Doctor" type="submit" />
                    <div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;