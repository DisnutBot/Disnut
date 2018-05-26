# Disnut

[![Discord](https://discordapp.com/api/guilds/423876349577658368/embed.png)](https://discord.gg/X6JrGKM)
[![Build Status](https://api.travis-ci.org/Disnut/Disnut.svg?branch=master)](https://travis-ci.org/Disnut/Disnut)
[![Coverage Status](https://coveralls.io/repos/github/Disnut/Disnut/badge.svg?branch=master)](https://coveralls.io/github/Disnut/Disnut?branch=master)
[![Dependency Status](https://david-dm.org/Disnut/Disnut.svg?path=install)](https://david-dm.org/Disnut/Disnut?path=install)
[![Code Climate](https://codeclimate.com/github/Disnut/Disnut/badges/gpa.svg)](https://codeclimate.com/github/Disnut/Disnut)

[**Disnut Community**](https://disnut.ml) is powered by Node.js and built on either a Redis or MongoDB database. It utilizes web sockets for instant interactions and real-time notifications. Disnut has many modern features out of the box such as social network integration and streaming discussions, while still making sure to be compatible with older browsers.

Additional functionality is enabled through the use of third-party plugins.

* [Meta Discussion](https://disnut.ml/category/5/meta)
* [Documentation & Installation Instructions](http://github.com/Disnut/Docs)
* [Help translate Disnut](https://www.transifex.com/projects/p/disnut/)
* [Disnut Blog](https://medium.com/disnut)
* [Follow us on Twitter](http://www.twitter.com/DisnutOfficial/ "Disnut Twitter")
* [Like us on Facebook](http://www.facebook.com/DisnutOfficial/ "Disnut Facebook")

## How can I contribute?

* If you are a developer, feel free to check out the source and submit pull requests.
* If you are a designer, go and checkout here at [Frontend Repo](https://github.com/Disnut/Frontend).
* If you know languages other than English you can help us translate Disnut. We use [Transifex](https://www.transifex.com/projects/p/disnut/) for internationalization.
* Please don't forget to **like**, **follow**, and **star our repo**! Join our growing [community](http://disnut.ml) to keep up to date with the latest Disnut development.

## Requirements

Disnut requires the following software to be installed:

* A version of Node.js at least 6 or greater ([installation/upgrade instructions](https://github.com/nodesource/distributions))
* Redis, version 2.8.9 or greater **or** MongoDB, version 2.6 or greater
* NGINX, version 1.3.13 or greater (**only if** intending to use nginx to proxy requests to a Disnut)

## Installation

[Please refer to platform-specific installation documentation](https://github.com/Disnut/Docs/blob/master/INSTALLATION.md)

## Securing Disnut

It is important to ensure that your Disnut and database servers are secured. Bear these points in mind:

1. While some distributions set up Redis with a more restrictive configuration, Redis by default listens to all interfaces, which is especially dangerous when a server is open to the public. Some suggestions:
    * Set `bind_address` to `127.0.0.1` so as to restrict access  to the local machine only
    * Use `requirepass` to secure Redis behind a password (preferably a long one)
    * Familiarise yourself with [Redis Security](http://redis.io/topics/security)
2. Use `iptables` to secure your server from unintended open ports. In Ubuntu, `ufw` provides a friendlier interface to working with `iptables`.
    * e.g. If your Disnut is proxied, no ports should be open except 80 (and possibly 22, for SSH access)

## License

Disnut is licensed under [**MIT**](LICENSE).