import { SetMetadata } from '@nestjs/common';
import { Reflector,  } from '@nestjs/core';

export const ROLE_KEY = "roles"

export const Roles = (...Role: string[]) => SetMetadata(ROLE_KEY, Role)