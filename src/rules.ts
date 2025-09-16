/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface Rule {
  regex: (string | RegExp)[];
  level: Level;
  alternatives?: string[];
  message?: string;
}
export interface MessageContext {
  name: string;
  regex: string[];
  match: string;
  content: string;
  alternatives?: string[];
}

export const DEFAULT_MESSAGE = `
Please consider an alternative to \`{{match}}\`. 
{{#if alternatives~}}

Possibilities include: {{#each alternatives}}{{#if @index}}, {{/if}}\`{{this}}\`{{/each}}
{{~/if}}
`;

export enum Level {
  OFF = "off",
  NOTICE = "notice",
  WARNING = "warning",
  FAILURE = "failure",
}

export const DEFAULT_RULES: { [key: string]: Rule } = {
  master: {
    regex: [/master/gi],
    level: Level.WARNING,
    alternatives: ["primary", "main", "leader", "active", "writer"],
  },
  slave: {
    regex: [/slave/gi],
    level: Level.WARNING,
    alternatives: ["secondary", "node", "worker", "replica", "passive"],
  },
  whitelist: {
    regex: [/white[_-]*list/gi],
    level: Level.WARNING,
    alternatives: ["include list", "allow list"],
  },
  blacklist: {
    regex: [/black[_-]*list/gi],
    level: Level.WARNING,
    alternatives: ["exclude list", "deny list"],
  },
  grandfathered: {
    regex: [/grandfathered/gi],
    level: Level.OFF,
    alternatives: ["legacied", "exempted"],
  },
  sanity_check: {
    regex: [/sanity[_-]*check/gi],
    level: Level.OFF,
    alternatives: ["smoke test", "confidence check"],
  },
  man_hours: {
    regex: [/man[_-]*hours/gi],
    level: Level.OFF,
    alternatives: ["person-hours", "human-hours"],
  },
  cakewalk: {
    regex: [/cakewalk/gi],
    level: Level.WARNING,
    alternatives: ["easy", "simple", "trivial"],
  },
  crazy: {
    regex: [/\b(crazy|insane)\b/gi],
    level: Level.OFF,
    alternatives: ["unpredictable", "illogical", "confusing", "wild"],
  },
  cripple: {
    regex: [/\bcripple\b/gi],
    level: Level.WARNING,
    alternatives: ["disable", "slow down", "hinder"],
  },
  dummy: {
    regex: [/dummy/gi],
    level: Level.WARNING,
    alternatives: ["placeholder", "sample", "mock", "stub"],
  },
  guys: {
    regex: [/\bguys\b/gi],
    level: Level.OFF,
    alternatives: ["folks", "everyone", "people", "team", "y'all"],
  },
  housekeeping: {
    regex: [/housekeeping/gi],
    level: Level.OFF,
    alternatives: ["maintenance", "cleanup", "admin"],
  },
  lame: {
    regex: [/\blame\b/gi],
    level: Level.OFF,
    alternatives: ["uncool", "weak", "uninteresting", "subpar"],
  },
  redline: {
    regex: [/red[_-]*line/gi],
    level: Level.WARNING,
    alternatives: ["block", "exclude"],
  },
  abort: {
    regex: [/\b(abort|aborts|aborted|aborting)\b/gi],
    level: Level.OFF,
    alternatives: ["end", "stop", "cancel", "terminate"],
  },
  brownbag: {
    regex: [/brown[_-]*bag/gi],
    level: Level.WARNING,
    alternatives: ["lunch and learn", "tech talk", "show and tell"],
  },
  first_class_citizen: {
    regex: [/first[_-]*class[_-]*citizen/gi],
    level: Level.OFF,
    alternatives: ["first-class", "top-level", "core", "primary"],
  },
  kill: {
    regex: [/\b(kill|kills|killed|killing)\b/gi],
    level: Level.OFF,
    alternatives: ["end", "stop", "terminate", "cancel", "halt"],
  },
  powwow: {
    regex: [/\bpow[_-]*wow\b/gi],
    level: Level.WARNING,
    alternatives: ["meeting", "huddle", "sync-up", "gathering"],
  },
  native: {
    regex: [/\bnative(ly)?\b/gi],
    level: Level.OFF,
    alternatives: ["built-in", "integrated", "core", "platform-specific"],
  },
  tribal_knowledge: {
    regex: [/tribal[_-]*knowledge/gi],
    level: Level.WARNING,
    alternatives: ["institutional knowledge", "organizational knowledge"],
  },
};
