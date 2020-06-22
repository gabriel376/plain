# plain

## Usage
``` shell
$ deno run -A src/mod.ts [source] [options]
```

## Sources
``` shell
duckduckgo --query [query]               # Search DuckDuckGo
github --query [query] --page [page]     # Search GitHub
youtube --query [query] --page [page]    # Search YouTube
```

## Options
``` shell
--json       # Output JSON
--refresh    # Refresh cache
--version    # Show version
--help       # Show help
```

## Cache
By default, all data is saved as cache on `$HOME/.cache/plain`.
Use option `--refresh` to refresh it.

## Integration
`plain` can output parsed data with option `--json` and thus can be easily integrated with external tools, such as [jq](https://github.com/stedolan/jq):
``` shell
youtube --query typescript --json | jq '.results | .[0] | .link'
```

## Advanced Search

### DuckDuckGo
``` shell
"typescript inurl:why"           # search for "typescript" where page url contains "why"
"typescript intitle:deno"        # search for "typescript" where page title contains "deno"
"typescript filetype:pdf"        # search for "typescript" where file type is "pdf"
"typescript site:example.com"    # search for "typescript" on site "example.com"
```

### GitHub
``` shell
"user:gabriel376"                  # search for user "gabriel376"
"stars:>1000 typescript"           # search for "typescript" where stars > 1000
"created:>2020-01-01 typescript"   # search for "typescript" where created date > 2020-01-01
"pushed:>2020-01-01 typescript"    # search for "typescript" where pushed date > 2020-01-01
```

### YouTube
``` shell
"typescript, channel"               # search for "typescript" channels
"typescript, playlist"              # search for "typescript" playlists
"typescript, video, long"           # search for "typescript" videos, long duration
"typescript, video, hour, short"    # search for "typescript" videos, posted last hour, short duration
"typescript, video, today, 4k"      # search for "typescript" videos, posted today, quality 4K
"typescript, video, week, hd"       # search for "typescript" videos, posted this week, quality HD
"typescript, video, month, cc"      # search for "typescript" videos, posted this month, with subtitles
"typescript, video, year, -cc"      # search for "typescript" videos, posted this year, without subtitles
```
