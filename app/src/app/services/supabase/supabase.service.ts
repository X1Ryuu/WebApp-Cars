import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private bucket = 'car_pics'

  constructor() {
    this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseKey
    );
  }

  getPublicImageUrl(path: string): string {
    const { data } = this.supabase
        .storage
        .from(this.bucket)
        .getPublicUrl(path);

    return data.publicUrl;
  }
}
