#!/usr/bin/env bash

if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then
  echo "Skipping build for branch $VERCEL_GIT_COMMIT_REF"
  exit 0
fi

exit 1