#!/bin/sh
# Verify every published edition carries the things that are easy to forget
# and invisible when missing. Run before pushing a new edition:
#
#   sh check-editions.sh
#
# A template stops you starting from the wrong file. This catches the case
# where you started from the right one and then dropped something.

status=0
version=$(grep -o '?v=[0-9]*' index.html | head -1)

for f in edit/*/index.html; do
  case "$f" in edit/_template.html) continue ;; esac
  problems=""

  grep -q 'id="cc"'                     "$f" || problems="$problems\n    no cookie bar — page cannot measure or ask consent"
  grep -q 'capture.js'                  "$f" || problems="$problems\n    capture.js not loaded — the subscribe form does nothing"
  grep -q 'app.js'                      "$f" || problems="$problems\n    app.js not loaded — no analytics, no cookie bar logic"
  grep -q 'data-source='                "$f" || problems="$problems\n    form has no data-source — leads land unattributed"
  grep -q 'rel="canonical"'             "$f" || problems="$problems\n    no canonical — Substack will outrank this copy"
  grep -q '<a href="/edit/">The Oyogo Edit</a>' "$f" || problems="$problems\n    nav out of date — The Oyogo Edit should be first"

  # Article pages must not carry their own Supabase code; capture.js owns it.
  grep -q 'supabase.co'                 "$f" && problems="$problems\n    inline Supabase script — should use capture.js instead"

  # Markdown that survives a paste from Substack or Word. Matches paired
  # emphasis in running text only — target="_blank" and @hann_oyogo are not it.
  grep -qE '(^|[[:space:]>])_[A-Za-z][^_]*_([[:space:]]|[.,;:!?<])' "$f" \
    && problems="$problems\n    literal _underscores_ — markdown that never converted"
  grep -qE '\*\*[A-Za-z]'               "$f" && problems="$problems\n    literal **asterisks** — markdown that never converted"

  # Stale cache-bust: assets pinned to an older version than the homepage.
  if [ -n "$version" ] && ! grep -q -- "$version" "$f"; then
    problems="$problems\n    assets not on $version — visitors may get cached CSS/JS"
  fi

  # noindex is correct on the template, never on a published edition.
  grep -q 'noindex'                     "$f" && problems="$problems\n    noindex — this edition will not be indexed"

  if [ -n "$problems" ]; then
    printf '%s\n' "✗ $f"
    printf "$problems\n"
    status=1
  else
    printf '%s\n' "✓ $f"
  fi
done

[ $status -eq 0 ] && printf '\nAll editions clean.\n' || printf '\nFix the above before pushing.\n'
exit $status
