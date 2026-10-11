export const port = 3848;
export const host = "127.0.0.1";

// Pause between snapshot-all page loads, in milliseconds.
export const snapshotGapMs = 1000;

const origin = "https://rule34.xxx";

export const site = {
  id: "rule34",
  origin,
  match: [`${origin}/*`],
};

function slugify(value) {
  return (
    String(value)
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "unknown"
  );
}

export function pageIdFromUrl(href) {
  try {
    const url = new URL(href);
    const page = url.searchParams.get("page");
    const s = url.searchParams.getAll("s").find(Boolean) || "";
    if (!page) {
      const path = url.pathname.replace(/^\//, "").replace(/\.php$/, "");
      if (!path || path === "index") {
        return "homepage";
      }
      return slugify(path);
    }
    return s ? `${page}-${slugify(s)}` : page;
  } catch {
    return "unknown";
  }
}

const githubRepo = "https://github.com/audiogooner/rule34-everforest";
const rawInstallCss = `${githubRepo.replace(
  "https://github.com/",
  "https://raw.githubusercontent.com/",
)}/main/rule34.min.user.css`;

export const metadata = {
  name: "Rule34.xxx Everforest",
  version: "0.1.0",
  description: "A dark theme for rule34.xxx using the Everforest medium palette",
  author: "Nanumpf",
  preprocessor: "default",
  namespace: "https://github.com/nils-affentranger",
  homepageURL: githubRepo,
  supportURL: `${githubRepo}/issues`,
  updateURL: rawInstallCss,
  downloadURL: rawInstallCss,
  "run-at": "document-start",
};

function docPrefix(pathAndQuery) {
  return `url-prefix("${origin}${pathAndQuery}")`;
}

function docExact(pathAndQuery) {
  return `url("${origin}${pathAndQuery}")`;
}

function docRegexp(source) {
  return `regexp("${source}")`;
}

const pageBundles = [
  {
    file: "src/pages/homepage.scss",
    document: `${docExact("/")}, ${docExact("/index.php")}`,
  },
  {
    file: "src/pages/post-list.scss",
    document: docPrefix("/index.php?page=post&s=list"),
  },
  {
    file: "src/pages/post-view.scss",
    document: docPrefix("/index.php?page=post&s=view"),
  },
  {
    file: "src/pages/post-add.scss",
    document: docRegexp(
      String.raw`https://rule34\.xxx/index\.php\?page=post&s=add(?:&|$)`,
    ),
  },
  {
    file: "src/pages/post-add-video.scss",
    document: docPrefix("/index.php?page=post&s=addVideo"),
  },
  {
    file: "src/pages/comment-list.scss",
    document: docPrefix("/index.php?page=comment&s=list"),
  },
  {
    file: "src/pages/wiki-list.scss",
    document: docPrefix("/index.php?page=wiki&s=list"),
  },
  {
    file: "src/pages/wiki-view.scss",
    document: docPrefix("/index.php?page=wiki&s=view"),
  },
  {
    file: "src/pages/wiki-history.scss",
    document: docPrefix("/index.php?page=wiki&s=history"),
  },
  {
    file: "src/pages/wiki-create.scss",
    document: docPrefix("/index.php?page=wiki&s=create"),
  },
  {
    file: "src/pages/alias-list.scss",
    document: docPrefix("/index.php?page=alias&s=list"),
  },
  {
    file: "src/pages/alias-add.scss",
    document: docPrefix("/index.php?page=alias&s=add"),
  },
  {
    file: "src/pages/artist-list.scss",
    document: docPrefix("/index.php?page=artist&s=list"),
  },
  {
    file: "src/pages/artist-show.scss",
    document: docPrefix("/index.php?page=artist&s=show"),
  },
  {
    file: "src/pages/artist-create.scss",
    document: docPrefix("/index.php?page=artist&s=create"),
  },
  {
    file: "src/pages/artist-update.scss",
    document: docPrefix("/index.php?page=artist&s=update"),
  },
  {
    file: "src/pages/tags-list.scss",
    document: docPrefix("/index.php?page=tags&s=list"),
  },
  {
    file: "src/pages/tags-edit.scss",
    document: docPrefix("/index.php?page=tags&s=edit"),
  },
  {
    file: "src/pages/pool-list.scss",
    document: docPrefix("/index.php?page=pool&s=list"),
  },
  {
    file: "src/pages/pool-show.scss",
    document: docPrefix("/index.php?page=pool&s=show"),
  },
  {
    file: "src/pages/pool-add.scss",
    document: docPrefix("/index.php?page=pool&s=add"),
  },
  {
    file: "src/pages/pool-edit.scss",
    document: docPrefix("/index.php?page=pool&s=edit"),
  },
  {
    file: "src/pages/pool-order.scss",
    document: docPrefix("/index.php?page=pool&s=order"),
  },
  {
    file: "src/pages/pool-import.scss",
    document: docPrefix("/index.php?page=pool&s=import"),
  },
  {
    file: "src/pages/pool-history.scss",
    document: docPrefix("/index.php?page=pool&s=history"),
  },
  {
    file: "src/pages/pool-post-pool-list.scss",
    document: docPrefix("/index.php?page=pool&s=post-pool-list"),
  },
  {
    file: "src/pages/forum-list.scss",
    document: docPrefix("/index.php?page=forum&s=list"),
  },
  {
    file: "src/pages/forum-view.scss",
    document: docPrefix("/index.php?page=forum&s=view"),
  },
  {
    file: "src/pages/forum-add.scss",
    document: docPrefix("/index.php?page=forum&s=add"),
  },
  {
    file: "src/pages/favorites-view.scss",
    document: docPrefix("/index.php?page=favorites&s=view"),
  },
  {
    file: "src/pages/account-home.scss",
    document: docPrefix("/index.php?page=account&s=home"),
  },
  {
    file: "src/pages/account-login.scss",
    document: docPrefix("/index.php?page=account&s=login"),
  },
  {
    file: "src/pages/account-reg.scss",
    document: docPrefix("/index.php?page=account&s=reg"),
  },
  {
    file: "src/pages/account-profile.scss",
    document: docPrefix("/index.php?page=account&s=profile"),
  },
  {
    file: "src/pages/account-options.scss",
    document: docPrefix("/index.php?page=account&s=options"),
  },
  {
    file: "src/pages/account-change-password.scss",
    document: docPrefix("/index.php?page=account&s=change_password"),
  },
  {
    file: "src/pages/gmail.scss",
    document: docRegexp(
      String.raw`https://rule34\.xxx/index\.php\?page=gmail(?:&(?!s=).*)?$`,
    ),
  },
  {
    file: "src/pages/gmail-home.scss",
    document: docPrefix("/index.php?page=gmail&s=list"),
  },
  {
    file: "src/pages/gmail-view.scss",
    document: docPrefix("/index.php?page=gmail&s=view"),
  },
  {
    file: "src/pages/gmail-send-pm.scss",
    document: docPrefix("/index.php?page=gmail&s=send_pm"),
  },
  {
    file: "src/pages/history.scss",
    document: docPrefix("/index.php?page=history&type=tag_history"),
  },
  {
    file: "src/pages/history-notes.scss",
    document: docPrefix("/index.php?page=history&type=page_notes"),
  },
  {
    file: "src/pages/icame.scss",
    document: docPrefix("/index.php?page=icame"),
  },
  {
    file: "src/pages/help.scss",
    document: docPrefix("/index.php?page=help"),
  },
  {
    file: "src/pages/about.scss",
    document: docPrefix("/index.php?page=about"),
  },
  {
    file: "src/pages/tos.scss",
    document: docPrefix("/index.php?page=tos"),
  },
  {
    file: "src/pages/link.scss",
    document: docPrefix("/link.php"),
  },
  {
    file: "src/pages/pp.scss",
    document: docPrefix("/pp.php"),
  },
];

export const bundles = [
  {
    file: "src/base.scss",
    document: docPrefix(""),
  },
  ...pageBundles,
];

export const exportFile = "rule34.user.css";
export const exportMinFile = "rule34.min.user.css";

export const preview = {
  file: "scripts/preview.mjs",
  out: "preview/homepage.webp",
};

const live = { userscriptOnly: true };

export const snapshotPages = [
  { id: "homepage", url: `${origin}/` },
  { id: "post-list", url: `${origin}/index.php?page=post&s=list&tags=all` },
  {
    id: "post-view",
    explore: {
      from: "post-list",
      try: [
        {
          href: /page=post&(?:amp;)?s=view&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=post&s=view&id=$1`,
        },
      ],
    },
  },
  {
    id: "post-add",
    url: `${origin}/index.php?page=post&s=add`,
    ...live,
  },
  {
    id: "post-add-video",
    url: `${origin}/index.php?page=post&s=addVideo`,
    ...live,
  },
  { id: "comment-list", url: `${origin}/index.php?page=comment&s=list` },
  { id: "wiki-list", url: `${origin}/index.php?page=wiki&s=list` },
  {
    id: "wiki-view",
    explore: {
      from: "wiki-list",
      try: [
        {
          href: /page=wiki&(?:amp;)?s=view&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=wiki&s=view&id=$1`,
        },
      ],
    },
  },
  {
    id: "wiki-history",
    explore: {
      from: "wiki-list",
      try: [
        {
          href: /page=wiki&(?:amp;)?s=view&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=wiki&s=history&id=$1`,
        },
      ],
    },
  },
  {
    id: "wiki-create",
    url: `${origin}/index.php?page=wiki&s=create`,
    ...live,
  },
  { id: "alias-list", url: `${origin}/index.php?page=alias&s=list` },
  {
    id: "alias-add",
    url: `${origin}/index.php?page=alias&s=add`,
    ...live,
  },
  { id: "artist-list", url: `${origin}/index.php?page=artist&s=list` },
  {
    id: "artist-show",
    explore: {
      from: "artist-list",
      try: [
        {
          href: /page=artist&(?:amp;)?s=show&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=artist&s=show&id=$1`,
        },
      ],
    },
  },
  {
    id: "artist-create",
    url: `${origin}/index.php?page=artist&s=create`,
    ...live,
  },
  {
    id: "artist-update",
    explore: {
      from: "artist-list",
      try: [
        {
          href: /page=artist&(?:amp;)?s=show&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=artist&s=update&id=$1`,
        },
      ],
    },
    ...live,
  },
  { id: "tags-list", url: `${origin}/index.php?page=tags&s=list` },
  {
    id: "tags-edit",
    explore: {
      from: "tags-list",
      try: [
        {
          href: /page=tags&(?:amp;)?s=edit&(?:amp;)?tag=([^"'&\s<>]+)/,
          url: `${origin}/index.php?page=tags&s=edit&tag=$1`,
        },
      ],
    },
  },
  { id: "pool-list", url: `${origin}/index.php?page=pool&s=list` },
  {
    id: "pool-show",
    url: `${origin}/index.php?page=pool&s=show&id=58987`,
  },
  {
    id: "pool-add",
    url: `${origin}/index.php?page=pool&s=add`,
  },
  {
    id: "pool-edit",
    url: `${origin}/index.php?page=pool&s=edit&id=58987`,
  },
  {
    id: "pool-order",
    url: `${origin}/index.php?page=pool&s=order&id=58987`,
  },
  {
    id: "pool-import",
    url: `${origin}/index.php?page=pool&s=import&id=58987`,
  },
  {
    id: "pool-history",
    url: `${origin}/index.php?page=pool&s=history&id=58987`,
  },
  {
    id: "pool-post-pool-list",
    explore: {
      from: "post-list",
      try: [
        {
          href: /page=post&(?:amp;)?s=view&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=pool&s=post-pool-list&id=$1`,
        },
      ],
    },
  },
  { id: "forum-list", url: `${origin}/index.php?page=forum&s=list` },
  {
    id: "forum-view",
    url: `${origin}/index.php?page=forum&s=view&id=4240`,
  },
  { id: "forum-add", url: `${origin}/index.php?page=forum&s=add` },
  {
    id: "favorites-view",
    url: `${origin}/index.php?page=favorites&s=view&id=1`,
  },
  {
    id: "account-home",
    url: `${origin}/index.php?page=account&s=home`,
    ...live,
  },
  { id: "account-login", url: `${origin}/index.php?page=account&s=login` },
  { id: "account-reg", url: `${origin}/index.php?page=account&s=reg` },
  {
    id: "account-profile",
    explore: {
      from: "comment-list",
      try: [
        {
          href: /page=account&(?:amp;)?s=profile&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=account&s=profile&id=$1`,
        },
      ],
    },
  },
  {
    id: "account-options",
    url: `${origin}/index.php?page=account&s=options`,
    ...live,
  },
  {
    id: "account-change-password",
    url: `${origin}/index.php?page=account&s=change_password`,
    ...live,
  },
  {
    id: "gmail",
    url: `${origin}/index.php?page=gmail`,
    ...live,
  },
  {
    id: "gmail-home",
    url: `${origin}/index.php?page=gmail&s=list`,
    ...live,
  },
  {
    id: "gmail-view",
    url: `${origin}/index.php?page=gmail&s=view`,
    ...live,
  },
  {
    id: "gmail-send-pm",
    url: `${origin}/index.php?page=gmail&s=send_pm`,
    ...live,
  },
  {
    id: "history",
    explore: {
      from: "post-list",
      try: [
        {
          href: /page=post&(?:amp;)?s=view&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=history&type=tag_history&id=$1`,
        },
      ],
    },
  },
  {
    id: "history-notes",
    explore: {
      from: "post-list",
      try: [
        {
          href: /page=post&(?:amp;)?s=view&(?:amp;)?id=(\d+)/,
          url: `${origin}/index.php?page=history&type=page_notes&id=$1`,
        },
      ],
    },
  },
  { id: "icame", url: `${origin}/index.php?page=icame` },
  { id: "help", url: `${origin}/index.php?page=help` },
  { id: "about", url: `${origin}/index.php?page=about` },
  { id: "tos", url: `${origin}/index.php?page=tos` },
  { id: "link", url: `${origin}/link.php` },
  { id: "pp", url: `${origin}/pp.php` },
];
