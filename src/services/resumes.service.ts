import { Api } from "@/enums/api.enum";
import { Jsons } from "@/enums/jsons.enums";
import { ResumesJson } from "@/types/resume.type";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({ providedIn: "root" })
export class ResumesService {
  public constructor(
    private readonly http: HttpClient
  ) {}

  public execute() {
    const resumesJson = this.http.get<ResumesJson>(`${Api.resume}/${Jsons.resumes}`, { responseType: "json" });
    const resumes = resumesJson.pipe(map((json) => {
      return json.info;
    }));

    return resumes;
  }
}
