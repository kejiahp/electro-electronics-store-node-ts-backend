import {Request, Response} from 'express'
import { createAddressInput } from '../schemas/address-schema'
import { createAddressService, findAddress, updateAddressService } from '../services/address-service'

export const createAddressController = async (req:Request<{},{}, createAddressInput["body"]>, res:Response) => {
    const userId = res.locals.user._id

    if(String(userId) !== req.body.userId) return res.status(401).send("Unauthorized to create address")

    const address = await createAddressService(req.body)

    if(!address) return res.status(500).send("can't create address")

    return res.status(201).send(address)
}

export const getAddressController = async (req: Request, res: Response) => {
    const userId = res.locals.user._id

    const address = await findAddress({userId})

    if(!address) return res.status(404).send("no address")

    return res.status(200).send(address)
}

export const updateAddressController = async (req:Request, res:Response) => {
    const userId = res.locals.user._id

    const address = await findAddress({userId})
    

    if(!address) return res.status(404).send("no adddress found to be updated")

    const addressId = address._id as string

    const updatedAddress = await updateAddressService(addressId, req.body, {new: true})

    if(!updatedAddress) return res.status(500).send("address couldnt be updated successfully")

    return res.status(200).send(updatedAddress)
}