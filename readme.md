## Data Collection Server Metrics

[![Travis](https://img.shields.io/travis/bradenhs/dc-metrics.svg)]()
[![Coveralls](https://img.shields.io/coveralls/bradenhs/dc-metrics.svg)]()

View live at [http://dc-metrics.netlify.com](http://dc-metrics.netlify.com)

# Overview

## Libraries

- TypeStyle
- MobX
- Prettier
- Jest
- Webpack

## Project Organization

- *src*
- *www*
- *package.json* Contains scripts
- *package-lock.json*
- *webpack.config.ts*

## Code Organization

- *constants* 
- *mixins*

```typescript
function ActivatableMixin(base) {
  return class extends base {
    isActivated: boolean

    activate() {
      this.isActivated = true
    }

    deactivate() {
      this.isActivated = false
    }
  }
}

function TimestampedMixin(base) {
  return class extends base {
    time = Date.now()
  }
}

class User extends ActivatableMixin(TimestampedMixin(class { })) {
  firstName: string
  lastName: string
}

// with a little syntactic sugag

class User extends mix(ActivatableMixin, TimestampedMixin) {
  firstName: string
  lastName: string
}
```

- *services* Application specific utilities (API)
- *store* The M and C of MVC
- *utils* Non-application specific utilities (isInteger)
- *view* All tsx and css go here. Pure function of the state contained in the store.
- *index.tsx* entry point

## Goal

- Convert application to something similiar to this.

Continous Integration
Continous Deployment
Deployment Previews - Netlify
Cache Invalidation
CDN
Instant Rollback
One click SSL
API Proxying

Netlify

TypeStyle
MobX

Project Structure
