import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditDialogComponent } from './add-or-edit-dialog/add-or-edit-dialog.component';
import { MovieService } from './movie-service.service';

export interface Movie {
  order: number;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'dragDrop';
  draggedIndex: number = 0;
  draggedMovie: string = ''
  // movies: Movie[] = [];

  movies: Movie[] = [
    {
      order: 1,
      label: 'The Phantom Menace'
    },
    {
      order: 2,
      label: 'Attack of the Clones'
    },
    {
      order: 3,
      label: 'Revenge of the Sith'
    },
    {
      order: 4,
      label: 'A New Hope'
    },
    {
      order: 5,
      label: 'The Empire Strikes Back'
    },
    {
      order: 6,
      label: 'Return of the Jedi'
    },
  ];

  constructor(
    private _dialog: MatDialog,
    private _movieService: MovieService
  ) {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movies = this._movieService.getMovies();
  }

  updateOrderLabels() {
    this.movies.forEach((movie, index) => {
      movie.order = index + 1;
    });
    this._movieService.saveMovies(this.movies);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.draggedIndex = event.currentIndex;
    this.draggedMovie = this.movies[event.currentIndex].label;
    moveItemInArray(this.movies, event.previousIndex, this.draggedIndex);
    this.updateOrderLabels();
  }

  openMovieDialog(isNewMovie: boolean, newLabel?: string): void {
    const dialogRef = this._dialog.open(AddOrEditDialogComponent, {
      width: '20%',
      data: { isNewMovie, label: newLabel || '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && isNewMovie) {
        const newMovie: Movie = {
          order: this.movies.length + 1,
          label: result,
        };
        this.movies.push(newMovie);
        this._movieService.addMovie(newMovie);
        this.updateOrderLabels();

      } else if (result && !isNewMovie && newLabel) {
        const editedMovieIndex = this.movies.findIndex(movie => movie.label === newLabel);
        if (editedMovieIndex !== -1) {
          this.movies[editedMovieIndex].label = result;
          this._movieService.saveMovies(this.movies);
        }
      }
    });
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this._movieService.saveMovies(this.movies);
    this.updateOrderLabels();
  }

}
