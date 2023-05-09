// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  project: "",

  data_assembly_steps : [] = ["Joining Duplo_2x2_blue with Duplo_8x2 to sub-assembly 1", "Joining Duplo_2x2_red with Duplo_4x2 to sub-assembly 2", "Joining sub-assembly 1 with sub-assembly 2 and component Dupplo_2x2_green to final product"],

  url_criteria_catalogue:"http://localhost:8080/api/criteria_catalogue",
  url_human : "http://localhost:8080/api/skill_human",
  url_robot : "http://localhost:8080/api/skill_robot",
  url_assembly_sequence: "http://localhost:8080/api/assembly_sequence_plan"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
