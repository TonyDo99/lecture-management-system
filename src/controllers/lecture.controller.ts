import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';
import LectureModel from '../models/lecture.model';
import { s3Client } from '../services/s3';

const lectureInfo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const lecture = await LectureModel.findById(id);

    if (!lecture) {
      res.status(400).json({
        message: 'Lecture not found',
        data: null,
      });
      return;
    }

    res.json({
      message: 'Get lecture info successfully',
      data: lecture,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const lectureCreate = async (req: Request, res: Response): Promise<void> => {
  const { title, description, author } = req.body;

  if (!req.file) {
    res.status(400).json({ error: 'No video file uploaded' });
    return;
  }

  try {
    const lectureCreated = await LectureModel.create({
      title,
      description,
      author,
      destination: `${process.env.AWS_S3_OBJECTS_FOLDER}/`,
    });

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET || '',
      Key: `${process.env.AWS_S3_OBJECTS_FOLDER}/${lectureCreated._id}.mp4`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    const uploadResult = await s3Client.send(command);
    res.json({
      message: 'Video uploaded successfully',
      url: uploadResult,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const lectureDelete = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const lectureDeleted = await LectureModel.findByIdAndDelete(id);
    if (!lectureDeleted) {
      res.status(404).json({ error: 'Lecture not found' });
      return;
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET || '',
      Key: `${process.env.AWS_BUCKET}/${lectureDeleted._id}.mp4`,
    });

    s3Client.send(command);
    res.json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const lectureUpdate = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, author } = req.body;

  try {
    const lectureUpdated = await LectureModel.findByIdAndUpdate(
      id,
      { title, description, author },
      { new: true }
    );

    if (!lectureUpdated) {
      res.status(404).json({ error: 'Lecture not found' });
      return;
    }

    if (req.file) {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: `${process.env.AWS_S3_OBJECTS_FOLDER}/${id}.mp4`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });
      s3Client.send(command);
    }

    res.json({ message: 'Lecture updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const lectures = async (_: Request, res: Response): Promise<void> => {
  try {
    const lectures = await LectureModel.find();
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { lectures, lectureInfo, lectureCreate, lectureDelete, lectureUpdate };
