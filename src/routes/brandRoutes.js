const express = require("express");
const router = express.Router();
const controller = require("../controllers/BrandController");
const fileUploader = require("../common/cloudy/cloudinaryBrand");
const authorize = require("../common/authorization/authorization-middleware");

/**
 * @swagger
 * tags:
 *  name: Brand
 *  description: this for brand api
 * /brand:
 *  get:
 *      tags: [Brand]
 *      summary: get all brand
 *      parameters:
 *          - name: page
 *            default: 1
 *            in: query
 *            schema:
 *                  type: integer
 *          - name: pageSize
 *            default: 10
 *            in: query
 *            schema:
 *                  type: integer
 *          - name: name
 *            in: query
 *            chema:
 *                  type: text 
 *      responses:
 *          default:
 *              description: this is the default response
 */
router.get("", controller.getAllBrand);

/**
 * @swagger
 * tags:
 *  name: Brand
 *  description: this for brand api
 * /brand/{id}:
 *  get:
 *      tags: [Brand]
 *      summary: get brand detail
 *      parameters:
 *          - name: id
 *            in: path
 *            chema:
 *                  type: integer
 *            required: true 
 *      responses:
 *          default:
 *              description: this is the default response
 */
router.get("/:id", controller.getProductInBrand);

/**
 * @swagger
 * tags:
 *  name: Brand
 *  description: this for brand api
 * /brand:
 *  post:
 *      tags: [Brand]
 *      security:
 *          - Bearer: []
 *      summary: create new brand
 *      consumes:
 *          - multipart/form-data
 *      parameters:
 *          - name: name
 *            in: formData
 *            chema:
 *                  type: integer
 *            required: true 
 *          - name: logo
 *            in: formData
 *            type: file
 *      responses:
 *          default:
 *              description: this is the default response
 */
router.post("",authorize("ADMIN") ,fileUploader.single("logo"), controller.createBrand);

/**
 * @swagger
 * tags:
 *  name: Brand
 *  description: this for brand api
 * /brand/{id}:
 *  put:
 *      tags: [Brand]
 *      security:
 *          - Bearer: []
 *      summary: update info brand
 *      consumes:
 *          - multipart/form-data
 *      parameters:
 *          - name: id
 *            in: path
 *            chema:
 *                  type: integer
 *            required: true 
 *          - name: name
 *            in: formData
 *            chema:
 *                  type: integer
 *            required: true 
 *          - name: logo
 *            in: formData
 *            type: file
 *      responses:
 *          default:
 *              description: this is the default response
 */
router.put("/:id",authorize("ADMIN"),fileUploader.single("logo"),controller.updateBrand);

/**
 * @swagger
 * tags:
 *  name: Brand
 *  description: this for brand api
 * /brand/{id}:
 *  delete:
 *      tags: [Brand]
 *      security:
 *          - Bearer: []
 *      summary: delete info brand
 *      parameters:
 *          - name: id
 *            in: path
 *            chema:
 *                  type: integer
 *            required: true 
 *      responses:
 *          default:
 *              description: this is the default response
 */
router.delete("/:id", authorize("ADMIN"),controller.deleteBrand);

module.exports = router;