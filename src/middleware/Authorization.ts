import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
}

class Authorization {
  async hasAuthorized(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const token = request.headers.authorization;

    if (!token)
      return response.status(401).json({
        error: "Bearer token is required!",
      });

    try {
      const decoded = verify(token.slice(7), process.env.SECRET_KEY);
      if (!decoded)
        return response.status(401).json({
          error: "Invalid token or expired!",
        });

      const { id } = decoded as TokenPayload;

      request.user = {
        id,
      };

      next(null);
    } catch (error) {
      return response.status(401).json({
        error: "Invalid token or expired!",
      });
    }
  }
}

export { Authorization };
