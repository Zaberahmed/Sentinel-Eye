import { Request, Response } from 'express';
import { createCrimeReport, findAllCrime, findCrimeById, findCrimeByMonth } from './../models/crime.model';
const makeCrimeReport = async (req: Request, res: Response) => {
	try {
		const { user_id, category, location, context } = req.body;
		const crimeReport = { user_id, category, location, context };
		const newCrimeReport = await createCrimeReport(crimeReport);
		return res.status(201).send(newCrimeReport);
	} catch (error) {
		console.log(error);
	}
};
const getAllCrime = async (req: Request, res: Response) => {
	try {
		const crimes = await findAllCrime();
		return res.status(200).send(crimes);
	} catch (error) {
		console.log(error);
	}
};
const getCrimeById = async (req: Request, res: Response) => {
	try {
		const { _id } = req.body;
		const crime = await findCrimeById(_id);
		return res.status(200).send(crime);
	} catch (error) {
		console.log(error);
	}
};

const getCrimeByMonth = async (req: Request, res: Response) => {
	try {
		const { month } = req.body;
		const crime = await findCrimeByMonth(month);
		return res.status(200).send(crime);
	} catch (error) {
		console.log(error);
	}
};

export { makeCrimeReport, getAllCrime, getCrimeById, getCrimeByMonth };
