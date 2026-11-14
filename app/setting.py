from pydantic import Field

from pydantic_settings import BaseSettings

__all__ = ["settings"]


class Settings(BaseSettings):
    trilium_url: str = Field()


settings = Settings()
