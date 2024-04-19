import { Injectable } from '@angular/core';

export type MovieResponse = { order: number; label: string; }

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private storageKey = 'movies';

  constructor() { }

  getMovies(): MovieResponse[] {
    const moviesData = localStorage.getItem(this.storageKey);
    return moviesData ? JSON.parse(moviesData) : [];
  }

  saveMovies(movies: MovieResponse[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(movies));
  }

  addMovie(newMovie: MovieResponse): void {
    const movies = this.getMovies();
    movies.push(newMovie);
    this.saveMovies(movies);
  }

  editMovie(index: number, updatedMovie: MovieResponse): void {
    const movies = this.getMovies();
    movies[index] = updatedMovie;
    this.saveMovies(movies);
  }

  deleteMovie(index: number): void {
    const movies = this.getMovies();
    movies.splice(index, 1);
    this.saveMovies(movies);
  }
}


