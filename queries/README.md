# Accounts

📌 Account 테이블 생성

```
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(20),
  phone VARCHAR(20),
  password VARCHAR(30) NOT NULL,
  first_name VARCHAR(10) NOT NULL,
  last_name VARCHAR(10) NOT NULL
);
```

# Channels

📌 Channels 테이블 생성

```
CREATE TABLE channels (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(20),
  descriptions TEXT,
  account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE
);
```

📌 구독 테이블 생성

```
CREATE TABLE subscribe (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  subscriber_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  UNIQUE(subscriber_id, channel_id)
);
```

# Videos

📌 Videos 테이블 생성

```
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(50) NOT NULL,
  views_cnt INTEGER DEFAULT 0,
  descriptions TEXT,
  len INTEGER NOT NULL,
  thumbnail_url VARCHAR(240) NOT NULL,
  channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE
);
```

📌 'Video 시청 상태' 테이블 생성

```
CREATE TABLE channel_statuses_for_video (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_viewed_loc INTEGER NOT NULL,
  channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  UNIQUE(channel_id, video_id)
);
```

# Comments

📌 Comments 테이블 생성

```
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  contents VARCHAR(500),
  thumbnail_url VARCHAR(240) NOT NULL,
  channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES community_posts(id) ON DELETE CASCADE,
  CHECK (
    COALESCE((video_id)::BOOLEAN::INTEGER, 0)
    +
    COALESCE((post_id)::BOOLEAN::INTEGER, 0)
    = 1
  )
);
```

# Hashtags

📌 Hashtags 테이블 생성

```
CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(20) NOT NULL UNIQUE,
);
```

📌 'Video 태그달기' 테이블 생성

```
CREATE TABLE hashtags_for_video (
  id SERIAL PRIMARY KEY,
  hashtag_id INTEGER NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
  video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  UNIQUE(hashtag_id, video_id)
);
```

# Others

📌 Like or Hate 테이블 생성

```
CREATE TABLE likes_or_hates (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  type like_or_hate,
  channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES community_posts(id) ON DELETE CASCADE,
  comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  CHECK (
    COALESCE((video_id)::BOOLEAN::INTEGER, 0)
    +
    COALESCE((post_id)::BOOLEAN::INTEGER, 0)
    +
    COALESCE((comment_id)::BOOLEAN::INTEGER, 0)
    = 1
  ),
  UNIQUE(chennel_id, video_id, post_id, comment_id)
);
```
