import { getEnvVar } from "../utils";

function getMinimumPageNumber(): string {
  return getEnvVar("MINIMUM_PAGE_NUMBER");
}

function getMinimumPageSize(): string {
  return getEnvVar("MINIMUM_PAGE_SIZE");
}

function getMaximumPageSize(): string {
  return getEnvVar("MAXIMUM_PAGE_SIZE");
}

export { getMaximumPageSize, getMinimumPageNumber, getMinimumPageSize };
