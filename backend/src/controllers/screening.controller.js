import { Screening, Movie, Room } from '../models/index.js';


export const getAllScreenings = async (req, res, next) => {
  try {
    const screenings = await Screening.findAll({
      include: [
        { model: Movie, attributes: ['id', 'title', 'duration'] },
        { model: Room, attributes: ['id', 'name', 'capacity'] },
      ],
      order: [['startTime', 'ASC']],
    });

    res.status(200).json({
      success: true,
      count: screenings.length,
      data: screenings,
    });
  } catch (error) {
    next(error);
  }
};


export const getScreeningById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const screening = await Screening.findByPk(id, {
      include: [
        { model: Movie, attributes: ['id', 'title', 'duration'] },
        { model: Room, attributes: ['id', 'name', 'capacity'] },
      ],
    });

    if (!screening) {
      return res.status(404).json({
        success: false,
        message: 'Séance non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      data: screening,
    });
  } catch (error) {
    next(error);
  }
};


export const createScreening = async (req, res, next) => {
  try {
    const { movieId, roomId, startTime, price } = req.body;

    if (!movieId || !roomId || !startTime) {
      return res.status(400).json({
        success: false,
        message: 'Movie, salle et heure de début sont obligatoires',
      });
    }

    const screening = await Screening.create({
      MovieId: movieId,
      RoomId: roomId,
      startTime,
      price,
    });

    res.status(201).json({
      success: true,
      message: 'Séance créée avec succès',
      data: screening,
    });
  } catch (error) {
    next(error);
  }
};
