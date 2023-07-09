import { Request, Response } from 'express';
import { createMissingReport, findAllMissing, findMissingById, findMissingByMonth } from './../models/missing.model';
const makeMissingReport = async (req: Request, res: Response) => {
	try {
		const { user_id, type, name, image, last_seen, age, height, description } = req.body;
		const missingReport = { user_id, type, name, image, last_seen, age, height, description };
		const newMissingReport = await createMissingReport(missingReport);
		return res.status(201).send(newMissingReport);
	} catch (error) {
		console.log(error);
	}
};
const getAllMissing = async (req: Request, res: Response) => {
	try {
		const crimes = await findAllMissing();
		return res.status(200).send(crimes);
	} catch (error) {
		console.log(error);
	}
};
const getMissingById = async (req: Request, res: Response) => {
	try {
		const { _id } = req.body;
		const crime = await findMissingById(_id);
		return res.status(200).send(crime);
	} catch (error) {
		console.log(error);
	}
};

const getMissingByMonth = async (req: Request, res: Response) => {
	try {
		const { month } = req.body;
		const crime = await findMissingByMonth(month);
		return res.status(200).send(crime);
	} catch (error) {
		console.log(error);
	}
};

export { makeMissingReport, getAllMissing, getMissingById, getMissingByMonth };
