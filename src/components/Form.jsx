import React , {useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import illustration from '../assets/box-illustration.svg'
import { useHistory } from 'react-router-dom'
import axios from '../axios'
import InputGroup from './InputGroup'
import { formSchema } from '../validation/Form'
import Button from './Button'

const Form = () => {
    const [loading, setLoading] = useState(false)
    
    const history = useHistory()
    const {register, handleSubmit , formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })
    
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            let result = await axios.post('/donate' , data)
            
            if(result.status === 201) {
                setLoading(false)
                history.push('/success' , {data})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAmount = (e) => {
        if(e.target.value !== "") {
            if(parseInt(e.target.value) < 10) {
                e.target.value = 10
            }
        } else {
            e.target.value = 10
        }
    }
    
    return (
        <div className=" md:w-2/3 mx-auto">
            <div className="md:w-2/3 mx-auto">
                <img className="w-full" src={illustration} alt="box illustration" />
            </div>
            <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-8">
                    <div className={"flex items-center " + (errors.donation ? "invalid" : "")}>
                        <span className="absolute text-3xl font-light translate-x-8">S$</span>
                        <input onKeyUp={handleAmount} autoFocus={true} min="10" className={" py-4 px-8 pl-20 text-2xl font-semibold"} placeholder="Donation amount" type="number" {...register('donation')} />
                    </div>
                    <p className="error">{errors.donation?.message}</p>
                </div>
                <div className="container-form-group">
                    <InputGroup label="Email" type="email" name="email" register={register} errors={errors} />
                    <InputGroup label="Full Name" name="fullName" register={register} errors={errors} />
                </div>
                <div className="container-form-group">
                    <InputGroup label="NRIC" name="nric" register={register} errors={errors} />
                    <InputGroup label="Phone Number" name="phoneNumber" required={false} register={register} errors={errors} />
                </div>
                <InputGroup label="Address" name="address" required={false} register={register} errors={errors} />
                <Button loading={loading} />
            </form>
        </div>
    )
}

export default Form
