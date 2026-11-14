from pydantic import Field

from pydantic_settings import BaseSettings

__all__ = ["settings"]


class Settings(BaseSettings):
    trilium_url: str = Field()
    trilium_token: str = Field(default="")
    export_base_url: str = Field(default="")


settings = Settings()
