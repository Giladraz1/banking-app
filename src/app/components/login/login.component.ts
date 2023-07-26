// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/store';
import { login } from '../../store/actions/auth.actions';
import { selectError } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectError).subscribe(error => this.error = error);
  }

  onSubmit(): void {
    this.store.dispatch(login({ username: this.username, password: this.password }));
  }
}
