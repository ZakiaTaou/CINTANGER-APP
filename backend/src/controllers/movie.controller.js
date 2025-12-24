import { Movie } from '../models/index.js';

export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};


export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Film non trouvé',
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};


export const createMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      duration,
      genre,
      posterUrl,
      rating,
    } = req.body;

    if (!title || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Le titre et la durée sont obligatoires',
      });
    }

    const movie = await Movie.create({
      title,
      description,
      duration,
      genre,
      posterUrl,
      rating,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Film créé avec succès',
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};
