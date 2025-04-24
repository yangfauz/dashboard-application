package config

type Config struct {
	App        App        `toml:"app"`
	Token      Token      `toml:"token"`
	Connection Connection `toml:"connection"`
}

type App struct {
	Mode  string `toml:"mode"`
	Debug bool   `toml:"debug"`
	Name  string `toml:"name"`
	URL   string `toml:"url"`
	Port  int    `toml:"port"`
}

// Token
type Token struct {
	JWT JWT `toml:"jwt"`
}

type JWT struct {
	SecretKey      string `toml:"key"`
	BaseExpiration int32  `toml:"expired"`
}

// Connection
type Connection struct {
	Sqlite Sqlite `toml:"sqlite"`
}

type Sqlite struct {
	Database string `toml:"database"`
}
